import axios from 'axios';
import { cache } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { currentValidator } from '@/lib/validators/request';
import { errorHandler } from '@/lib/error';

const AQI_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

const fetchCurrentAQI = cache(
    async (location: { latitude: number; longitude: number }) => {
        const response = await axios.post(
            'https://airquality.googleapis.com/v1/currentConditions:lookup',
            {
                location,
                universalAqi: false,
                extraComputations: [
                    'LOCAL_AQI',
                    'POLLUTANT_CONCENTRATION',
                    'HEALTH_RECOMMENDATIONS',
                ],
                customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
            },
            {
                params: { key: AQI_API_KEY },
            },
        );
        return response.data;
    },
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!AQI_API_KEY) {
            return NextResponse.json(
                { error: 'Maps API key is required' },
                { status: 500 },
            );
        }

        const { location } = await currentValidator.parseAsync(body);
        const data = await fetchCurrentAQI(location);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}

// Optional: Add revalidation config if using App Router
export const revalidate = 300;
