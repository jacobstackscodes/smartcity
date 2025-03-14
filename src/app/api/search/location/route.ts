import { errorHandler } from '@/lib/error';
import { GeocodingAPIResponse } from '@/types/google-location';
import axios from 'axios';
import { distance } from 'fastest-levenshtein';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

export async function GET(request: NextRequest) {
    try {
        const search = request.nextUrl.searchParams.get('search');

        if (!search) {
            return NextResponse.json('Search query parameter is required', {
                status: 400,
            });
        }

        if (!API_KEY) {
            return NextResponse.json(
                'Maps API key is missing from environment variables',
                { status: 500 },
            );
        }

        const { data } = await axios.get<GeocodingAPIResponse>(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    key: API_KEY,
                    address: `${search}, Bangalore, Karnataka, India`,
                    region: 'in',
                    components:
                        'administrative_area_level_1:Karnataka|locality:Bangalore',
                },
            },
        );

        // Handle empty results
        if (!data.results || data.results.length === 0) {
            return NextResponse.json('No results found in Bangalore', {
                status: 404,
            });
        }

        // Extract first result
        const result = data.results;

        // Check if it's an exact match and not a partial match
        const typoThreshold = 2; // Allow minor spelling mistakes (adjustable)
        const originalQuery = search.toLowerCase().trim();
        const isCloseMatch = result[0].address_components.some((component) => {
            return (
                distance(originalQuery, component.long_name.toLowerCase()) <=
                    typoThreshold ||
                distance(originalQuery, component.short_name.toLowerCase()) <=
                    typoThreshold
            );
        });

        // Only reject if it's a partial match *and* no close match is found
        if (result.length > 1 || (result[0].partial_match && !isCloseMatch)) {
            return NextResponse.json(
                'Received partial match, please provide a more specific location',
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                formatted_address: result[0].formatted_address,
                location: {
                    latitude: result[0].geometry.location.lat,
                    longitude: result[0].geometry.location.lng,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        return errorHandler(error);
    }
}
