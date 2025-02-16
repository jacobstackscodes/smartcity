type Location = {
    latitude: number;
    longitude: number;
};

type LocationEntry = {
    name: string;
    type: 'city' | 'sublocality';
    location: Location;
};

type CityData = LocationEntry[];

export type { Location, LocationEntry, CityData };
