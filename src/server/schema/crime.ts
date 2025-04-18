import mongoose, { Schema, Document } from 'mongoose';

export interface ICrime extends Document {
    reportNumber: number;
    dateReported: Date;
    dateOfOccurrence: Date;
    timeOfOccurrence: Date;
    city: string;
    crimeCode: number;
    crimeDescription: string;
    victimAge: number;
    victimGender: 'M' | 'F' | null;
    weaponUsed: string | null;
    crimeDomain: string;
    policeDeployed: number;
    caseClosed: boolean;
    dateCaseClosed: Date | null;
}

const CrimeSchema: Schema = new Schema(
    {
        reportNumber: { type: Number, required: true, unique: true },
        dateReported: { type: Date, required: true },
        dateOfOccurrence: { type: Date, required: true },
        timeOfOccurrence: { type: Date, required: true },
        city: { type: String, required: true },
        crimeCode: { type: Number, required: true },
        crimeDescription: { type: String, required: true },
        victimAge: { type: Number, required: true },
        victimGender: { type: String, enum: ['M', 'F', null], default: null },
        weaponUsed: { type: String, default: null },
        crimeDomain: { type: String, required: true },
        policeDeployed: { type: Number, required: true },
        caseClosed: { type: Boolean, required: true },
        dateCaseClosed: { type: Date, default: null },
    },
    { timestamps: true }, // Adds createdAt and updatedAt
);

export default mongoose.models.Crime ||
    mongoose.model<ICrime>('Crime', CrimeSchema, 'crime');
