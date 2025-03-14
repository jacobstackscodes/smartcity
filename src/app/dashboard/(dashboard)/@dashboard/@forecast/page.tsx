import { AQIForecast } from '@/components/dashboard/aqi-forecast';
import { fetchForecast, fetchLocation } from '@/lib/requests';
import { retrieveInterval } from '@/lib/utils';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const search = ((await searchParams)?.search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    const period = retrieveInterval(2);
    const forecast =
        location &&
        (await fetchForecast({
            location: location.location,
            period,
        }));

    if (!forecast) throw new Error('Forecast data not found');

    return (
        <section className="px-20">
            <h4 className="mb-4 text-lg font-semibold text-black">
                Hourly Forecast
            </h4>
            <AQIForecast data={forecast} />
        </section>
    );
}
