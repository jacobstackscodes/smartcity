import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { currentValidator } from '@/lib/validators/request';
import { errorHandler } from '@/lib/error';

const AQI_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!AQI_API_KEY) {
            return NextResponse.json('Maps API key is required', {
                status: 500,
            });
        }

        const validatedBody = await currentValidator.parseAsync(body);
        const { data } = await axios.post(
            'https://airquality.googleapis.com/v1/currentConditions:lookup',
            {
                ...validatedBody,
                universalAqi: false,
                extraComputations: [
                    'LOCAL_AQI',
                    'POLLUTANT_CONCENTRATION',
                    'HEALTH_RECOMMENDATIONS',
                ],
                customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
            },
            {
                params: {
                    key: AQI_API_KEY,
                },
            },
        );

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
