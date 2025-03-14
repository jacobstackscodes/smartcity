import { AxiosError } from 'axios';
import clsx, { type ClassArray } from 'clsx';
import { addHours, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';
import { createMessageBuilder, fromError } from 'zod-validation-error';

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
        message: (error.response?.data as { error: { message: string } }).error
            .message,
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

    const formatTz = (dateTime: Date) =>
        formatInTimeZone(dateTime, 'UTC', "yyyy-MM-dd'T'HH:00:00XXX");

    // Move to the next full hour
    let nextHour = addHours(now, 1);

    // If the current time is less than 1 minute to the next hour, add another hour
    if (now.getMinutes() === 59) {
        nextHour = addHours(nextHour, 1);
    }

    const period = {
        startTime: formatTz(nextHour),
        endTime: formatTz(addDays(nextHour, days)),
    };

    return period;
};

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);

    return {
        date: formatInTimeZone(date, 'IST', 'dd MMM'),
        time: formatInTimeZone(date, 'IST', 'hh:mm a'),
    };
};

export {
    cn,
    pollutionUnits,
    aqiStatus,
    formatZodError,
    formatAxiosError,
    retrieveInterval,
    formatDateTime,
};
