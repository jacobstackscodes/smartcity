'use client';

import { AdvancedMarker, Map } from '../ui/maps';

type Props = {
    center?: {
        lat: number;
        lng: number;
    };
};

export const AQIMap = ({
    center: _center = {
        lat: 12.9716,
        lng: 77.5946,
    },
}: Props) => {
    return (
        <Map>
            <AdvancedMarker position={_center} />
        </Map>
    );
};
