import { NextResponse } from 'next/server';
import { connectToDB } from '@/server/mongoose';
import Houses from '@/server/schema/houses';
import Crime from '@/server/schema/crime';

export async function GET() {
    await connectToDB();

    const houses = await Houses.find({});
    const crimes = await Crime.find({});

    const data: Record<string, { availability: number; crimeCount: number }> =
        {};

    houses.forEach((house) => {
        const loc = house.location?.trim();
        const isAvailable = house.availability?.includes('Ready') ? 1 : 0;
        if (!data[loc]) data[loc] = { availability: 0, crimeCount: 0 };
        data[loc].availability += isAvailable;
    });

    crimes.forEach((crime) => {
        const loc = crime.Area?.trim();
        if (data[loc]) {
            data[loc].crimeCount += crime.CrimeCount || 0;
        }
    });

    return NextResponse.json(data);
}
