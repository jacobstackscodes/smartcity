import mongoose, { Schema, InferSchemaType } from 'mongoose';

const crimeSchema = new Schema(
    {
        reportNumber: { type: Number, required: true },
        dateReported: { type: String, required: true },
        dateOfOccurrence: { type: String, required: true },
        timeOfOccurrence: { type: String, required: true },
        city: { type: String, required: true },
        crimeCode: { type: Number, required: true },
        crimeDescription: { type: String, required: true },
        victimAge: { type: Number, required: true },
        victimGender: { type: String, required: true },
        weaponUsed: { type: String, required: true },
        crimeDomain: { type: String, required: true },
        policeDeployed: { type: Number, required: true },
        caseClosed: { type: String, required: true },
        dateCaseClosed: { type: String },
    },
    {
        collection: 'crime', // 👈 prevent pluralization
    },
);

export type CrimeType = InferSchemaType<typeof crimeSchema>;
export const Crime =
    mongoose.models.Crime || mongoose.model('Crime', crimeSchema);
