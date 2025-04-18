import { connectToDB } from '@/server/mongoose';
import House from '@/server/schema/houses';
import Crime from '@/server/schema/crime';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectToDB();

    const houses = await House.aggregate([
        {
            $group: {
                _id: { location: '$location', availability: '$availability' },
                count: { $sum: 1 },
            },
        },
    ]);

    const crimes = await Crime.aggregate([
        {
            $group: {
                _id: '$city',
                crimeCount: { $sum: 1 },
            },
        },
    ]);

    const merged = {};

    houses.forEach(({ _id, count }) => {
        const { location, availability } = _id;
        if (!merged[location]) merged[location] = { location };
        merged[location][
            availability === 'Ready To Move'
                ? 'readyToMove'
                : 'underConstruction'
        ] = count;
    });

    crimes.forEach(({ _id, crimeCount }) => {
        const location = _id;
        if (!merged[location]) merged[location] = { location };
        merged[location].crimeCount = crimeCount;
    });

    return NextResponse.json(Object.values(merged));
}
