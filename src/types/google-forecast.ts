type Index = {
    code: string;
    displayName: string;
    aqi: number;
    aqiDisplay: string;
    color: {
        red: number;
        green: number;
        blue?: number | undefined;
    };
    category: string;
    dominantPollutant: string;
};

type Forecast = {
    dateTime: string;
    indexes: Index[];
};

type ForecastResponse = {
    hourlyForecasts: Forecast[];
    regionCode: string;
    nextPageToken: string;
};
