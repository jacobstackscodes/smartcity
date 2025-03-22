import axios from 'axios';
import { cache } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';

import { forecastValidator } from '@/lib/validators/request';
import { errorHandler } from '@/lib/error';
import { formatDateTime } from '@/lib/utils';

const FORECAST_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

const fetchForecastAQI = cache(
    async (
        location: { latitude: number; longitude: number },
        period: { startTime: string; endTime: string },
    ) => {
        const { data } = await axios.post<ForecastAPIResponse>(
            'https://airquality.googleapis.com/v1/forecast:lookup',
            {
                location,
                period,
                pageSize:
                    differenceInDays(period.endTime, period.startTime) * 24,
                universalAqi: false,
                extraComputations: ['LOCAL_AQI'],
                customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
            },
            {
                params: { key: FORECAST_API_KEY },
            },
        );

        if (!data) {
            throw new Error('No data found');
        }

        const response = data.hourlyForecasts.reduce(
            (result, item) => {
                const { date, time } = formatDateTime(item.dateTime);
                const aqi = item.indexes[0].aqi;
                if (!result[date]) result[date] = [];
                result[date].push({ time, aqi });
                return result;
            },
            {} as Record<string, { time: string; aqi: number }[]>,
        );

        return Object.entries(response).map(([date, data]) => ({ date, data }));
    },
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!FORECAST_API_KEY) {
            return NextResponse.json('Maps API key is required', {
                status: 500,
            });
        }

        const validatedBody = await forecastValidator.parseAsync(body);
        const data = await fetchForecastAQI(
            validatedBody.location,
            validatedBody.period,
        );

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

export const revalidate = 3600;
