import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

interface CrimeTypeVsPropertyResult {
  _id: { crimeDomain: string; areaType: string };
  count: number;
  avgPrice: number;
}

export async function GET(): Promise<NextResponse<CrimeTypeVsPropertyResult[] | { error: string }>> {
  try {
    const db = await getDb();
    const result = (await db.collection("crimes").aggregate([
      {
        $lookup: {
          from: "properties",
          let: { crimeLoc: "$location" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $lt: [
                    { $geoDistance: { $geometry1: "$$crimeLoc", $geometry2: "$locationGeo" } },
                    1000,
                  ],
                },
              },
            },
          ],
          as: "nearbyProperties",
        },
      },
      { $unwind: "$nearbyProperties" },
      {
        $group: {
          _id: { crimeDomain: "$crimeDomain", areaType: "$nearbyProperties.areaType" },
          count: { $sum: 1 },
          avgPrice: { $avg: "$nearbyProperties.price" },
        },
      },
    ]).toArray()) as CrimeTypeVsPropertyResult[];
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}