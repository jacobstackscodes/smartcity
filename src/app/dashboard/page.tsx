import { AQIData } from '@/components/dashboard/aqi-data';
import { AQIMap } from '@/components/dashboard/aqi-map';
import { Search } from '@/components/dashboard/search';
import { Card } from '@/components/ui/card';
import { fetchAqi, fetchLocation } from '@/lib/requests';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const city = ((await searchParams).city as string) ?? 'Bangalore';

    const location = await fetchLocation(city);
    console.log(location);
    const aqi = await fetchAqi(location?.location);

    const aqi_data = aqi.indexes[0];

    return (
        <>
            <div className="absolute top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                <AQIMap center={location?.location} />
            </div>
            <Card className="absolute inset-x-0 bottom-16 z-5 mx-auto flex max-w-2xl flex-col gap-1 rounded-xl shadow-lg shadow-black">
                <div className="p-1">
                    <Search value={city ?? 'Bangalore'} />
                </div>
                <div className="h-px w-full bg-input" />
                <div className="grid grid-cols-4 p-1">
                    <AQIData data={aqi_data} />
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1"></div>
                </div>
            </Card>
        </>
    );
}
