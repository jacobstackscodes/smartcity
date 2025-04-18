import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/server/mongoose';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection('properties')
            .aggregate([
                {
                    $group: {
                        _id: '$city',
                        avgPrice: { $avg: '$price' },
                        propertyCount: { $sum: 1 },
                    },
                },
                {
                    $lookup: {
                        from: 'crimes',
                        localField: '_id',
                        foreignField: 'city',
                        as: 'crimes',
                    },
                },
                {
                    $project: {
                        city: '$_id',
                        avgPrice: 1,
                        crimeCount: { $size: '$crimes' },
                        crimeRate: {
                            $divide: ['$crimeCount', '$propertyCount'],
                        },
                    },
                },
            ])
            .toArray();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
