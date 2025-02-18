import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import mongoose from "mongoose";
import { Crime } from "@/types/crime";

const CrimeSchema = new mongoose.Schema({ "Date of Occurrence": Date }, { strict: false });
const CrimeModel = mongoose.models.Crime || mongoose.model("Crime", CrimeSchema);

export async function GET() {
  await db;

  const crimeTrend = await CrimeModel.aggregate([
    { $group: { _id: { $year: "$Date of Occurrence" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  return NextResponse.json(crimeTrend);
}
