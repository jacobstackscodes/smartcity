import { AQIMap } from '@/components/dashboard/aqi-map';
import { AQIPollutants } from '@/components/dashboard/aqi-pollutants';
import { Header } from '@/components/dashboard/header';
import { Search } from '@/components/dashboard/search';
import { Card } from '@/components/ui/card';
import { fetchAqi, fetchLocation } from '@/lib/requests';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const search = ((await searchParams).search as string) ?? 'Bangalore';

    const location = await fetchLocation(search);
    const aqi = await fetchAqi(location?.location);

    return (
        <main className="relative size-full min-h-dvh pt-[80dvh]">
            <div className="fixed top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                <AQIMap center={location?.location} />
            </div>
            <Card className="wrapper relative z-5 min-h-[20dvh] rounded-t-xl rounded-b-none !px-0 shadow-lg shadow-black">
                <Header
                    address={location?.formatted_address}
                    data={aqi?.indexes[0]}
                />
                <Search />
                <AQIPollutants data={aqi?.pollutants} />
            </Card>
        </main>
    );
}
