import type { LocationResponse, LatLng } from '@/types/google-location';
import type { AqiResponse } from '@/types/google-aqi';
import axios from 'axios';

const req = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const fetchLocation = async (search: string | null) => {
    if (!search) return null;

    const { data } = await req.get('/api/search/location', {
        params: { search },
    });

    return data as LocationResponse;
};

export const fetchAqi = async (location?: LatLng | null) => {
    if (!location) return null;

    const { data } = await req.post('/api/search/aqi', {
        location,
    });

    return data as AqiResponse;
};
