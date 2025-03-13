import { AQIAdvisory } from '@/components/dashboard/aqi-advisory';
import { AQIHeader } from '@/components/dashboard/aqi-header';
import { AQIMap } from '@/components/dashboard/aqi-map';
import { AQIPollutants } from '@/components/dashboard/aqi-pollutants';
import { Search } from '@/components/dashboard/search';
import { fetchAqi, fetchLocation } from '@/lib/requests';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    forecast: React.ReactNode;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Layout({ forecast, searchParams }: Props) {
    const search = ((await searchParams)?.search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) {
        notFound();
    }

    const current = await fetchAqi({ location: location.location });

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
                    {forecast}
                    <AQIPollutants data={current?.pollutants} />
                    <AQIAdvisory data={current?.healthRecommendations} />
                </section>
            </article>
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Dashboard',
};
