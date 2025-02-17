import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.search)
            return Response.json('Invalid search query', { status: 400 });
    } catch (error) {
        if (error instanceof Error)
            return Response.json(error.message, { status: 400 });

        return Response.json('Something went wrong', { status: 500 });
    }
}
