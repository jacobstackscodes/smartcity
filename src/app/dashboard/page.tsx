import { AQIAdvisory } from '@/components/dashboard/aqi-advisory';
import { AQIMap } from '@/components/dashboard/aqi-map';
import { AQIPollutants } from '@/components/dashboard/aqi-pollutants';
import { AQIHeader } from '@/components/dashboard/aqi-header';
import { Search } from '@/components/dashboard/search';
import { fetchAqi, fetchForecast, fetchLocation } from '@/lib/requests';
import { AQIForecast } from '@/components/dashboard/aqi-forecast';
import { retrieveInterval } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const search = ((await searchParams).search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) {
        notFound();
    }

    const current = await fetchAqi({ location: location.location });
    const forecast = await fetchForecast({
        location: location.location,
        period: retrieveInterval(),
    });

    console.log(forecast?.hourlyForecasts);

    return (
        <main className="relative size-full min-h-dvh pt-[calc(100dvh-9.875rem)]">
            <div className="fixed top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                <AQIMap center={location?.location} />
            </div>
            <article className="wrapper relative z-5 min-h-[20dvh] rounded-t-xl rounded-b-none bg-white !px-0 shadow-lg shadow-black">
                <AQIHeader
                    address={location?.formatted_address}
                    data={current?.indexes[0]}
                />
                <Search />
                <section className="space-y-8 py-8">
                    <AQIForecast />
                    <AQIPollutants data={current?.pollutants} />
                    <AQIAdvisory data={current?.healthRecommendations} />
                </section>
            </article>
        </main>
    );
}
