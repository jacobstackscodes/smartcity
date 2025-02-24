import { ZodError } from 'zod';
import { createMessageBuilder, fromError } from 'zod-validation-error';
import clsx, { type ClassArray } from 'clsx';
import { AxiosError } from 'axios';
import { twMerge } from 'tailwind-merge';
import { addMinutes, addHours, addDays, format } from 'date-fns';
import type { AqiState } from '@/types/google-aqi';

const cn = (...classes: ClassArray) => twMerge(clsx(classes));

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

const retrieveInterval = (days = 1) => {
    if (days < 1 || days > 4) {
        throw new Error('Forecast period must be between 1 and 4 days.');
    }

    const now = new Date();

    // Move to the next full hour
    const nextHour = addHours(now, 1);
    nextHour.setMinutes(0, 0, 0);

    // Helper function to format the date as local timestamp
    const formatLocalTime = (date: Date) =>
        format(date, "yyyy-MM-dd'T'HH:00:00xxx");

    const startTime = formatLocalTime(nextHour);
    const endTime = formatLocalTime(addDays(nextHour, days));

    return { startTime, endTime };
};

const formatDatetime = (dateTime: string) => {
    const date = format(new Date(dateTime), 'dd MMM');
    const time = format(new Date(dateTime), 'hh:mm a');

    return {
        date,
        time,
    };
};

export {
    cn,
    pollutionUnits,
    aqiStatus,
    formatZodError,
    formatAxiosError,
    retrieveInterval,
    formatDatetime,
};
