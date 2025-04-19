import { db } from '@/server/mongoose';
import { Crime } from '@/server/schema/crime';
import { NextResponse } from 'next/server';

export async function GET() {
    const results = await db(() =>
        Crime.aggregate([
            {
                $group: {
                    _id: '$crimeDescription',
                    count: { $sum: 1 },
                    avgPolice: { $avg: '$policeDeployed' },
                },
            },
            { $sort: { count: -1 } }, // or sort by avgPolice if desired
            {
                $project: {
                    _id: 0,
                    category: {
                        $reduce: {
                            input: {
                                $map: {
                                    input: {
                                        $split: [{ $toLower: '$_id' }, ' '],
                                    },
                                    as: 'word',
                                    in: {
                                        $concat: [
                                            {
                                                $toUpper: {
                                                    $substrCP: ['$$word', 0, 1],
                                                },
                                            },
                                            {
                                                $substrCP: [
                                                    '$$word',
                                                    1,
                                                    { $strLenCP: '$$word' },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                            initialValue: '',
                            in: {
                                $cond: [
                                    { $eq: ['$$value', ''] },
                                    '$$this',
                                    { $concat: ['$$value', ' ', '$$this'] },
                                ],
                            },
                        },
                    },
                    count: 1,
                    avgPolice: { $round: ['$avgPolice', 2] },
                },
            },
        ]),
    );

    return NextResponse.json(results);
}
