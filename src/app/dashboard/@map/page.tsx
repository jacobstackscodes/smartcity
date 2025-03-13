import { AQIMap } from '@/components/dashboard/aqi-map';
import { fetchLocation } from '@/lib/requests';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    const search = ((await searchParams).search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) {
        throw new Error('Location not found');
    }

    return <AQIMap center={location?.location} />;
}
