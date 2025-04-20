import { db } from '@/server/mongoose';
import { House } from '@/server/schema/house';

export async function GET() {
    const data = await db(async (conn) => {
        const house = House(conn);

        return await house.aggregate([
            // Filter out houses missing the size or region fields.
            {
                $match: {
                    size: { $exists: true, $ne: null },
                    region: { $exists: true, $ne: null },
                },
            },
            // Group houses by size and accumulate distinct regions for each size.
            {
                $group: {
                    _id: '$size',
                    totalProperties: { $sum: 1 },
                    regions: { $addToSet: '$region' },
                },
            },
            // Lookup crimes for each size using the list of regions. Because $lookup with a localField
            // and foreignField works on a single field, we use pipeline with $match and $in.
            {
                $lookup: {
                    from: 'crime',
                    let: { regions: '$regions' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$city', '$$regions'] } } },
                        { $count: 'crimeCount' },
                    ],
                    as: 'crimeStats',
                },
            },
            // Add the crime count to the document.
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
            // Project the desired fields.
            {
                $project: {
                    _id: 0,
                    size: '$_id',
                    totalProperties: 1,
                    crimeCount: 1,
                    avgZoneCrimeCount: 1,
                },
            },
        ]);
    });

    return Response.json(data);
}
