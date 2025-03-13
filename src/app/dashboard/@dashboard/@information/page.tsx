import { AQIAdvisory } from '@/components/dashboard/aqi-advisory';
import { AQIPollutants } from '@/components/dashboard/aqi-pollutants';
import { fetchAqi, fetchLocation } from '@/lib/requests';

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    const search = (await searchParams).search ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) {
        throw new Error('Location not found');
    }

    const current = await fetchAqi(location);

    return (
        <>
            <AQIPollutants data={current?.pollutants} />
            <AQIAdvisory data={current?.healthRecommendations} />
        </>
    );
}
