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
                    averagePrice: { $avg: '$price' },
                    houseCount: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'crime',
                    localField: '_id',
                    foreignField: 'city',
                    as: 'crimeData',
                },
            },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    houseCount: 1,
                    crimeCount: { $size: '$crimeData' },
                    averagePrice: {
                        $let: {
                            vars: {
                                rounded: { $round: ['$averagePrice', 2] },
                                asString: {
                                    $toString: { $round: ['$averagePrice', 2] },
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
