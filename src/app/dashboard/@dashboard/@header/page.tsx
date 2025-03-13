import { AQIHeader } from '@/components/dashboard/aqi-header';
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
        <AQIHeader
            address={location?.formatted_address}
            data={current?.indexes[0]}
        />
    );
}
