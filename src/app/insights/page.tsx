import { AdvancedMarker, Map } from '@/components/ui/maps';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights',
};

export default function Page() {
    const position = { latitude: 12.971599, longitude: 77.594566 };

    return (
        <Map position={position}>
            <AdvancedMarker position={position} />
        </Map>
    );
}
