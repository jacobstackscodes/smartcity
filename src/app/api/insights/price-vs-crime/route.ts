import { db } from "@/server/mongoose";
import { House } from "@/server/schema/house";
import { NextResponse } from "next/server";

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
                    averagePrice: 1,
                    houseCount: 1,
                    crimeCount: { $size: '$crimeData' },
                },
            },
        ]);
    });

    return !data
        ? NextResponse.json({ message: 'No data found' }, { status: 404 })
        : NextResponse.json(data);
}