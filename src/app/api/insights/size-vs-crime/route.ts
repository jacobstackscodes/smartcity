import { NextResponse } from 'next/server';
import { connectToDB } from '@/server/mongoose';

interface SizeVsCrimeResult {
    _id: number;
    avgPrice: number;
    avgCrimeCount: number;
}

export async function GET(): Promise<
    NextResponse<SizeVsCrimeResult[] | { error: string }>
> {
    try {
        const db = await connectToDatabase();
        const result = (await db
            .collection('properties')
            .aggregate([
                { $match: { locationGeo: { $exists: true } } },
                {
                    $lookup: {
                        from: 'crimes',
                        let: { propLoc: '$locationGeo' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $lt: [
                                            {
                                                $geoDistance: {
                                                    $geometry1: '$$propLoc',
                                                    $geometry2: '$location',
                                                },
                                            },
                                            1000,
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'nearbyCrimes',
                    },
                },
                {
                    $group: {
                        _id: { $floor: { $divide: ['$totalSqft', 500] } },
                        avgPrice: { $avg: '$price' },
                        avgCrimeCount: { $avg: { $size: '$nearbyCrimes' } },
                    },
                },
            ])
            .toArray()) as SizeVsCrimeResult[];
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
