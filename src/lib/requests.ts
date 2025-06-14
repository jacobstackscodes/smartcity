import axios, { AxiosError } from 'axios';
import { CurrentProps, ForecastProps } from './validators/request';
import type { LocationResponse } from '@/types/google-location';
import type { AqiResponse } from '@/types/google-aqi';
import { notFound } from 'next/navigation';

export const req = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const fetchLocation = async (
    search: string | null,
): Promise<LocationResponse | null> => {
    if (!search) return null;

    try {
        const { data } = await req.get('/api/search/location', {
            params: { search },
        });
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.stack) {
                notFound();
            }

            console.error(error.response?.data);
            return null;
        }

        if (error instanceof Error) {
            console.error(error.message);
            return null;
        }

        return null;
    }
};

export const fetchAqi = async (
    values: CurrentProps,
): Promise<AqiResponse | null> => {
    if (!values) return null;

    const { data } = await req.post('/api/search/aqi/current', values);
    return data;
};

export const fetchForecast = async (
    values: ForecastProps,
): Promise<ForecastResponse | null> => {
    if (!values || !values.location || !values.period) return null;

    try {
        const { data } = await req.post('/api/search/aqi/forecast', values);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error({
                period: values.period,
                message: error.response?.data.message,
            });
            return null;
        }

        if (error instanceof Error) {
            console.error(error.message);
            return null;
        }

        return null;
    }
};
