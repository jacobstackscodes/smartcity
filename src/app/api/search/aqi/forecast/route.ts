import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { forecastValidator } from '@/lib/validators/request';
import { errorHandler } from '@/lib/error';
import { formatDatetime } from '@/lib/utils';

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
        const { data } = await axios.post<ForecastResponse>(
            'https://airquality.googleapis.com/v1/forecast:lookup',
            {
                location: validatedBody.location,
                period: validatedBody.period,
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

        // const response = {
        //     hourlyForecasts: data.hourlyForecasts.map((item) => {
        //         const { date, time } = formatDatetime(item.dateTime);
        //         return {
        //             date,
        //             time,
        //             aqi: item.indexes[0].aqi,
        //         };
        //     }),
        //     regionCode: data.regionCode,
        //     nextPageToken: data.nextPageToken,
        // };

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
