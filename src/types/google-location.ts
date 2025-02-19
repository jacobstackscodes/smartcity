type LatLng = {
    lat: number;
    lng: number;
};

type Types =
    | 'street_address'
    | 'route'
    | 'intersection'
    | 'political'
    | 'country'
    | 'administrative_area_level_1'
    | 'administrative_area_level_2'
    | 'administrative_area_level_3'
    | 'administrative_area_level_4'
    | 'administrative_area_level_5'
    | 'administrative_area_level_6'
    | 'administrative_area_level_7'
    | 'colloquial_area'
    | 'locality'
    | 'sublocality'
    | 'sublocality_level_1'
    | 'sublocality_level_2'
    | 'sublocality_level_3'
    | 'sublocality_level_4'
    | 'sublocality_level_5'
    | 'neighborhood'
    | 'premise'
    | 'subpremise'
    | 'plus_code'
    | 'postal_code'
    | 'natural_feature'
    | 'airport'
    | 'park'
    | 'point_of_interest';

type AddressCompnents = {
    long_name: string;
    short_name: string;
    types: Types[];
};

type GeocodingResult = {
    address_components: AddressCompnents[];
    formatted_address: string;
    geometry: {
        location: LatLng;
        location_type: string;
        viewport: {
            northeast: LatLng;
            southwest: LatLng;
        };
    };
    place_id: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    };
    types: Types[];
    partial_match: boolean;
};

type GeocodingAPIResponse = {
    results: GeocodingResult[];
    status: string;
};

type LocationResponse = {
    formatted_address: string;
    location: LatLng;
};

export type { LatLng, GeocodingAPIResponse, LocationResponse };
