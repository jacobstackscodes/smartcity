type PollutionUnit = 'PARTS_PER_BILLION' | 'MICROGRAMS_PER_CUBIC_METER';

type PollutantsConcentration = {
    code: string;
    displayName: string;
    fullName: string;
    concentration: {
        value: number;
        units: PollutionUnit;
    };
};

type Index = {
    code: string;
    displayName: string;
    aqi: number;
    aqiDisplay: string;
    category: string;
    color: {
        red: number;
        green: number;
        blue?: number;
    };
    dominantPollutant: string;
};

type AqiResponse = {
    dateTime: string;
    regionCode: string;
    indexes: Index[];
    pollutants?: PollutantsConcentration[];
};

export type { AqiResponse, PollutantsConcentration, Index };
