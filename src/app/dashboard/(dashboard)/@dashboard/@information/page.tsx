import { AQIAdvisory, AQIPollutants } from '@/components/dashboard/aqi';
import { fetchAqi, fetchLocation } from '@/lib/requests';

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    const search = (await searchParams).search ?? 'Bangalore';
    const location = await fetchLocation(search);

    const current = location && (await fetchAqi(location));

    return (
        <>
            <AQIPollutants data={current?.pollutants} />
            <AQIAdvisory data={current?.healthRecommendations} />
        </>
    );
}
