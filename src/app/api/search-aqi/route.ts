import { fetchCity } from '@/lib/requests';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const queryCity = request.nextUrl.searchParams.get('city');
        const _city = await fetchCity(queryCity);

        return Response.json(_city);
    } catch (error) {
        console.error('Error fetching city data:', error);
        if (error instanceof Error) {
            return Response.json(error.message, { status: 400 });
        }

        return Response.json('Something went wrong', { status: 500 });
    }
}
