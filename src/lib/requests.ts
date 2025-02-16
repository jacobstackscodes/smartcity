import type { CityData, Location, LocationEntry } from '@/types/requests';
import axios from 'axios';
import { genAi } from './utils';

export const fetchCity = async (
    city?: string | null,
): Promise<LocationEntry[] | null> => {
    if (!city) return null;

    try {
        const prompt = `Provide the latitude and longitude of ${city} and its sub-localities in JSON format: [ { "name": "CityName", "type": "city", "location": { "latitude": 0.0, "longitude": 0.0 } }, { "name": "SublocalityName", "type": "sublocality", "location": { "latitude": 0.0, "longitude": 0.0 } } ]. No explanations, just the data.`;
        const { response } = await genAi.generateContent(prompt);

        // clean up the response
        const data = response.text();
        const cleanText = JSON.parse(
            data.replace(/```json\n?|```/g, '').trim(),
        );

        return cleanText;
    } catch (error) {
        console.error('Error fetching city data:', error);
        return null;
    }
};

export const fetchAqi = async (city: CityData) => {
    if (!city?.length) {
        console.error('Invalid city data');
        return [];
    }

    const url = process.env.GOOGLE_AQI_URL as string;
    if (!url) {
        console.error('Missing AQI API URL');
        return [];
    }

    const config = { validateStatus: () => true };

    const payload = (location: Location) => ({
        location,
        universalAqi: false,
        extraComputations: ['LOCAL_AQI'],
        customLocalAqis: [{ regionCode: 'IN', aqi: 'usa_epa' }],
    });

    return Promise.all(
        city.map(async ({ name, type, location }) => {
            try {
                const { data } = await axios.post(
                    url,
                    payload(location),
                    config,
                );
                return { name, type, data };
            } catch (error) {
                console.error(`Error fetching AQI for ${name}:`, error);
                return { name, type, data: null };
            }
        }),
    );
};
