import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const AQI_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!AQI_API_KEY) {
            return NextResponse.json(
                { error: 'Maps API key is required' },
                { status: 500 },
            );
        }

        if (!body || !body.location) {
            return NextResponse.json(
                { error: 'Location data is required' },
                { status: 400 },
            );
        }

        if (!body.location.lng || !body.location.lat) {
            return NextResponse.json(
                { error: 'Location data must contain lat and lng' },
                { status: 400 },
            );
        }

        const payload = {
            location: {
                latitude: body.location.lat,
                longitude: body.location.lng,
            },
            universalAqi: false,
            extraComputations: [
                'LOCAL_AQI',
                'POLLUTANT_CONCENTRATION',
                'HEALTH_RECOMMENDATIONS',
            ],
            customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
        };

        const aqi_api = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${AQI_API_KEY}`;

        const { data } = await axios.post(aqi_api.toString(), payload);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data ?? error.message },
                { status: error.response?.status ?? 500 },
            );
        }

        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 },
        );
    }
}
