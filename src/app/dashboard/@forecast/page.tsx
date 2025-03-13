import { AQIForecast } from '@/components/dashboard/aqi-forecast';
import { fetchForecast, fetchLocation } from '@/lib/requests';
import { retrieveInterval } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const search = ((await searchParams)?.search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) {
        notFound();
    }

    const period = retrieveInterval(2);
    const forecast = await fetchForecast({
        location: location.location,
        period,
    });

    console.log(period, forecast?.hourlyForecasts);

    return <AQIForecast />;
}
