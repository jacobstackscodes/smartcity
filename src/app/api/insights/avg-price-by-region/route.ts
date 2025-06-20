import { db } from '@/server/mongoose';
import { House } from '@/server/schema/house';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = await db(async (conn) => {
        const house = House(conn);
        return house.aggregate([
            {
                $group: {
                    _id: '$region',
                    avgPrice: { $avg: '$price' },
                },
            },
            { $sort: { avgPrice: -1 } },
            {
                $project: {
                    region: '$_id',
                    _id: 0,
                    averagePrice: {
                        $let: {
                            vars: {
                                rounded: { $round: ['$avgPrice', 2] },
                                asString: {
                                    $toString: { $round: ['$avgPrice', 2] },
                                },
                            },
                            in: {
                                $cond: [
                                    {
                                        $regexMatch: {
                                            input: '$$asString',
                                            regex: /\.\d$/,
                                        },
                                    },
                                    { $concat: ['$$asString', '0'] },
                                    {
                                        $cond: [
                                            {
                                                $regexMatch: {
                                                    input: '$$asString',
                                                    regex: /\.\d{2}$/,
                                                },
                                            },
                                            '$$asString',
                                            { $concat: ['$$asString', '.00'] },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ]);
    });
    return !data
        ? NextResponse.json({ message: 'No data found' }, { status: 404 })
        : NextResponse.json(data);
}
