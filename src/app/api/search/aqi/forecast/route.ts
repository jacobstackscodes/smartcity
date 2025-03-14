import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';

import { forecastValidator } from '@/lib/validators/request';
import { errorHandler } from '@/lib/error';
import { formatDateTime } from '@/lib/utils';

const FORECAST_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!FORECAST_API_KEY) {
            return NextResponse.json('Maps API key is required', {
                status: 500,
            });
        }

        const validatedBody = await forecastValidator.parseAsync(body);
        const { data } = await axios.post<ForecastAPIResponse>(
            'https://airquality.googleapis.com/v1/forecast:lookup',
            {
                location: validatedBody.location,
                period: validatedBody.period,
                pageSize:
                    differenceInDays(
                        validatedBody.period.endTime,
                        validatedBody.period.startTime,
                    ) * 24,
                universalAqi: false,
                extraComputations: ['LOCAL_AQI'],
                customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
            },
            {
                params: {
                    key: FORECAST_API_KEY,
                },
            },
        );

        if (!data) {
            return NextResponse.json('No data found', { status: 404 });
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

        const formattedResponse = Object.entries(response).map(
            ([date, data]) => ({ date, data }),
        );

        return NextResponse.json(formattedResponse, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
