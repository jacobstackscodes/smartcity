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
                    avgPrice: { $avg: '$price' },
                },
            },
            { $sort: { avgPrice: -1 } },
        ]);
    });
    return !data
        ? NextResponse.json({ message: 'No data found' }, { status: 404 })
        : NextResponse.json(data);
}