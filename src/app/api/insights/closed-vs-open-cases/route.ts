import { db } from "@/server/mongoose";
import { Crime } from "@/server/schema/crime";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db(async (conn) => {
        const crime = Crime(conn);
        return crime.aggregate([
            {
                $group: {
                    _id: '$caseClosed',
                    count: { $sum: 1 },
                },
            },
        ]);
    });

    return !data
        ? NextResponse.json({ message: 'No data found' }, { status: 404 })
        : NextResponse.json(data);
}