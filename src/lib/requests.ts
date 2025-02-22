import type { LocationResponse, LatLng } from '@/types/google-location';
import type { AqiResponse } from '@/types/google-aqi';
import axios from 'axios';
import { CurrentProps, ForecastProps } from './validators/request';

const req = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const fetchLocation = async (
    search: string | null,
): Promise<LocationResponse | null> => {
    if (!search) return null;

    const { data } = await req.get('/api/search/location', {
        params: { search },
    });
    return data;
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

    const { data } = await req.post('/api/search/aqi/forecast', values);
    return data;
};
