import { db } from "@/server/mongoose";
import { Crime } from "@/server/schema/crime";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db(async (conn) => {
        const crime = Crime(conn);
        return crime.aggregate([
            {
                $bucket: {
                    groupBy: '$victimAge',
                    boundaries: [0, 18, 30, 45, 60, 120],
                    default: 'Unknown',
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
        ]);
    });
    return !data
        ? NextResponse.json({ message: 'No data found' }, { status: 404 })
        : NextResponse.json(data);
}