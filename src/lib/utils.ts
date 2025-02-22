import { GoogleGenerativeAI } from '@google/generative-ai';
import clsx, { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AqiState } from '@/types/google-aqi';
import { ZodError } from 'zod';
import { createMessageBuilder, fromError } from 'zod-validation-error';
import { AxiosError } from 'axios';

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

const aqiStatus = (aqi: number): AqiState => {
    if (aqi > 0 && aqi <= 50) return 'good';
    if (aqi > 50 && aqi <= 100) return 'moderate';
    if (aqi > 100 && aqi <= 150) return 'sensitive';
    if (aqi > 150 && aqi <= 200) return 'unhealthy';
    if (aqi > 200 && aqi <= 300) return 'very-unhealthy';
    if (aqi > 300 && aqi <= 500) return 'hazardous';
    else throw new Error('Invalid AQI value');
};

const formatAxiosError = (error: AxiosError) => {
    return {
        error: 'External API Error',
        message: error.response?.data || error.message,
    };
};

const formatZodError = (error: ZodError) => {
    const messageBuilder = createMessageBuilder({
        issueSeparator: ', ',
        unionSeparator: ' or ',
        prefix: null,
        prefixSeparator: ' ',
        includePath: false,
        maxIssuesInMessage: 3,
    });

    return {
        error: 'Validation Error',
        message: fromError(error, {
            messageBuilder,
        }).toString(),
    };
};

export {
    cn,
    genAi,
    pollutionUnits,
    aqiStatus,
    formatZodError,
    formatAxiosError,
};
