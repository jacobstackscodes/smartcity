import mongoose, { Schema, Document } from 'mongoose';

export interface IHouse extends Document {
    areaType: string;
    availability: string;
    location: string;
    size: string;
    society: string | null;
    totalSqft: string; // Stored as string due to range values like "2100 - 2850"
    bath: number | null;
    balcony: number | null;
    price: number;
}

const HouseSchema: Schema = new Schema(
    {
        areaType: { type: String, required: true },
        availability: { type: String, required: true },
        location: { type: String, required: true },
        size: { type: String, required: true },
        society: { type: String, default: null },
        totalSqft: { type: String, required: true }, // Kept as string for ranges
        bath: { type: Number, default: null },
        balcony: { type: Number, default: null },
        price: { type: Number, required: true },
    },
    { timestamps: true }, // Adds createdAt and updatedAt
);

export default mongoose.models.House ||
    mongoose.model<IHouse>('House', HouseSchema, 'house');
