import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

interface AvailabilityVsCrimeResult {
  _id: number;
  avgPrice: number;
  crimeCount: number;
}

export async function GET(): Promise<NextResponse<AvailabilityVsCrimeResult[] | { error: string }>> {
  try {
    const db = await getDb();
    const result = (await db.collection("properties").aggregate([
      { $match: { availability: "Ready To Move" } },
      { $lookup: { from: "crimes", localField: "city", foreignField: "city", as: "crimes" } },
      { $unwind: "$crimes" },
      {
        $group: {
          _id: { $year: "$crimes.dateReported" },
          avgPrice: { $avg: "$price" },
          crimeCount: { $sum: 1 },
        },
      },
    ]).toArray()) as AvailabilityVsCrimeResult[];
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}