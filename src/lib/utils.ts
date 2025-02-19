import { GoogleGenerativeAI } from '@google/generative-ai';
import clsx, { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...classes: ClassArray) => twMerge(clsx(classes));

const genAi = new GoogleGenerativeAI(
    process.env.GOOGLE_GEMINI_API_KEY as string,
).getGenerativeModel({ model: 'gemini-2.0-flash' });

const pollutionUnits = (unit: string) => {
    switch (unit) {
        case 'PARTS_PER_BILLION':
            return 'ppb';
        case 'MICROGRAMS_PER_CUBIC_METER':
            return 'µg/m³';
        default:
            return '';
    }
};

export { cn, genAi, pollutionUnits };
