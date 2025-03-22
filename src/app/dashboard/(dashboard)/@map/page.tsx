import { AdvancedMarker, Map, TrafficLayer } from '@/components/ui/maps';
import { fetchLocation } from '@/lib/requests';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    const search = ((await searchParams).search as string) ?? 'Bangalore';
    const location = await fetchLocation(search);

    if (!location) return null;

    return (
        <Map position={location.location}>
            <AdvancedMarker position={location.location} />
            <TrafficLayer />
        </Map>
    );
}
