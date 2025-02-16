import { fetchCity } from '@/lib/requests';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const queryCity =
            request.nextUrl.searchParams.get('city') ?? 'Bangalore';

        // fetch city data via Gemini API
        const data = await fetchCity(queryCity);

        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching city data:', error);
        if (error instanceof Error) {
            return Response.json(error.message, { status: 400 });
        }

        return Response.json('Something went wrong', { status: 500 });
    }
}
