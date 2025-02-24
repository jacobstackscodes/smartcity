import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { parseTemplate } from 'url-template';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export async function GET(request: NextRequest) {
    try {
        // Ensure API key is set
        if (!API_KEY) {
            return NextResponse.json(
                { error: 'Missing MAPS_API_KEY environment key' },
                { status: 400 },
            );
        }

        // Extract query params from URL (since GET requests don't have a body)
        const { searchParams } = request.nextUrl;
        const zoom = searchParams.get('zoom');
        const x = searchParams.get('x');
        const y = searchParams.get('y');

        const missingParams = ['zoom', 'x', 'y'].filter(
            (param) => !searchParams.get(param),
        );
        if (missingParams.length > 0) {
            return NextResponse.json(
                { error: `Missing parameters: ${missingParams.join(', ')}` },
                { status: 400 },
            );
        }

        // Construct API URL
        const apiUrl = parseTemplate(
            'https://airquality.googleapis.com/v1/mapTypes/aqi_us/heatmapTiles/{zoom}/{x}/{y}?key={apiKey}',
        ).expand({ zoom, x, y, apiKey: API_KEY });

        // Fetch the heatmap tile as a blob
        const { data } = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
        });

        return new NextResponse(data, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=3600', // Cache optimization
            },
        });
    } catch (error) {
        const error_msg =
            error instanceof Error ? error.message : 'Something went wrong';
        console.error('Error fetching heatmap tile:', error_msg);

        return NextResponse.json({ error: error_msg }, { status: 500 });
    }
}
