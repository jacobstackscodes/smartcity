import mongoose, { Schema, InferSchemaType } from 'mongoose';

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
    },
    {
        collection: 'house', // 👈 prevent pluralization
    },
);

export type HouseType = InferSchemaType<typeof houseSchema>;
export const House =
    mongoose.models.House || mongoose.model('House', houseSchema);
