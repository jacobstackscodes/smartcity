import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import mongoose from "mongoose";
import { Crime } from "@/types/crime";

const CrimeSchema = new mongoose.Schema({ City: String }, { strict: false });
const CrimeModel = mongoose.models.Crime || mongoose.model("Crime", CrimeSchema);

export async function GET() {
  await db;

  const hotspots = await CrimeModel.aggregate([
    { $group: { _id: "$City", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  return NextResponse.json(hotspots);
}
