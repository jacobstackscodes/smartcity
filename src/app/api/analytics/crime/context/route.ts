import { db } from '@/server/mongoose';
import { Crime } from '@/server/schema/crime';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const results = await db(() =>
            Crime.aggregate([
                {
                    $addFields: {
                        ageGroup: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $lt: ['$victimAge', 25] },
                                        then: '0-25',
                                    },
                                    {
                                        case: { $lt: ['$victimAge', 50] },
                                        then: '25-50',
                                    },
                                    {
                                        case: { $lt: ['$victimAge', 75] },
                                        then: '50-75',
                                    },
                                    {
                                        case: { $lte: ['$victimAge', 100] },
                                        then: '75-100',
                                    },
                                ],
                                default: 'Unknown',
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            weapon: '$weaponUsed',
                            gender: '$victimGender',
                            ageGroup: '$ageGroup',
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: {
                            weapon: '$_id.weapon',
                            gender: '$_id.gender',
                        },
                        stats: {
                            $push: {
                                ageGroup: '$_id.ageGroup',
                                count: '$count',
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: '$_id.weapon',
                        data: {
                            $push: {
                                gender: '$_id.gender',
                                stats: '$stats',
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        weapon: '$_id',
                        data: 1,
                    },
                },
                { $sort: { weapon: 1 } },
            ]),
        );

        return NextResponse.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);

        if (error instanceof Error)
            return NextResponse.json(error.message, { status: 500 });

        return NextResponse.json('Failed to fetch data', { status: 500 });
    }
}
