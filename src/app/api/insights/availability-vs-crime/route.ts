import { db } from '@/server/mongoose';
import { House } from '@/server/schema/house';

export async function GET() {
    const data = await db(async (conn) => {
        const house = House(conn);

        return await house.aggregate([
            // Filter out missing availability or region
            {
                $match: {
                    availability: { $exists: true, $ne: null },
                    region: { $exists: true, $ne: null },
                },
            },
            // Group by availability and gather unique regions per availability type
            {
                $group: {
                    _id: '$availability',
                    totalProperties: { $sum: 1 },
                    regions: { $addToSet: '$region' },
                },
            },
            // Lookup crime count across those regions
            {
                $lookup: {
                    from: 'crime',
                    let: { regions: '$regions' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$city', '$$regions'] },
                            },
                        },
                        { $count: 'crimeCount' },
                    ],
                    as: 'crimeStats',
                },
            },
            // Add computed fields
            {
                $addFields: {
                    crimeCount: {
                        $ifNull: [
                            { $arrayElemAt: ['$crimeStats.crimeCount', 0] },
                            0,
                        ],
                    },
                    avgZoneCrimeCount: {
                        $divide: [
                            {
                                $ifNull: [
                                    {
                                        $arrayElemAt: [
                                            '$crimeStats.crimeCount',
                                            0,
                                        ],
                                    },
                                    0,
                                ],
                            },
                            {
                                $cond: [
                                    { $gt: [{ $size: '$regions' }, 0] },
                                    { $size: '$regions' },
                                    1,
                                ],
                            },
                        ],
                    },
                },
            },
            // Final shape of the result
            {
                $project: {
                    _id: 0,
                    availability: '$_id',
                    totalProperties: 1,
                    crimeCount: 1,
                    avgZoneCrimeCount: 1,
                },
            },
        ]);
    });

    return Response.json(data);
}
