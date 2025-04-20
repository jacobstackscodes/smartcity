import { db } from '@/server/mongoose';
import { House } from '@/server/schema/house';

export async function GET() {
    const data = await db(() =>
        House.aggregate([
            // Group houses by region, calculating total price and count.
            {
                $group: {
                    _id: '$region',
                    averagePrice: { $avg: '$price' },
                    houseCount: { $sum: 1 },
                },
            },
            // Lookup matching crimes from the crime collection (matching on region == city).
            {
                $lookup: {
                    from: 'crime', // the collection name in MongoDB (as defined in your schema file)
                    localField: '_id',
                    foreignField: 'city',
                    as: 'crimeData',
                },
            },
            // Project the crime count along with region and average price.
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    averagePrice: 1,
                    houseCount: 1,
                    crimeCount: { $size: '$crimeData' },
                },
            },
        ]),
    );

    return Response.json(data);
}
