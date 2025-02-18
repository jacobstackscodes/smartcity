'use client';

import { AdvancedMarker, Map } from '../ui/maps';

type Props = {
    center?: {
        lat: number;
        lng: number;
    };
};

export const AQIMap = ({ center }: Props) => {
    return (
        <Map position={center!}>
            <AdvancedMarker />
        </Map>
    );
};
