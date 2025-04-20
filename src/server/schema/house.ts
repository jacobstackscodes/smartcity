import mongoose, { Schema, InferSchemaType, Connection } from 'mongoose';

const houseSchema = new Schema(
    {
        areaType: { type: String, required: true },
        availability: { type: String, required: true },
        location: { type: String, required: false },
        size: { type: String, required: false },
        society: { type: String, required: false },
        totalSqft: { type: String, required: true },
        bath: { type: Number, required: false },
        balcony: { type: Number, required: false },
        price: { type: Number, required: true },
        region: { type: String, required: false },
    },
    {
        collection: 'house', // 👈 prevent pluralization
    },
);

const House = (conn: Connection) =>
    conn.models.House || conn.model<HouseType>('House', houseSchema);

type HouseType = InferSchemaType<typeof houseSchema>;

export { House };
export type { HouseType };
