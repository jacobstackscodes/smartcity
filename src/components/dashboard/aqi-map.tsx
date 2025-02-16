'use client';

import { mapStyles } from '@/lib/constants';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useMemo, useRef } from 'react';

type Props = {
    center?: {
        lat: number;
        lng: number;
    };
};

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

export const AQIMap = ({
    center: _center = {
        lat: 12.9716,
        lng: 77.5946,
    },
}: Props) => {
    const center = useMemo(() => _center, [_center]);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
        null,
    );

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                id: 'google-maps-script',
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            });

            const { Map } = await loader.importLibrary('maps');
            const { AdvancedMarkerElement } =
                await loader.importLibrary('marker');

            if (mapRef.current && !mapInstanceRef.current) {
                const map = new Map(mapRef.current, {
                    center,
                    zoom: 14,
                    mapTypeControl: false,
                    streetViewControl: false,
                    draggable: true,
                    scrollwheel: true,
                    panControl: false,
                    mapId: 'react-advanced-maps',
                    styles: mapStyles,
                });

                const marker = new AdvancedMarkerElement({
                    position: center,
                    map,
                });

                mapInstanceRef.current = map;
                markerRef.current = marker;
            }
        };

        initMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pan to new center when `center` updates
    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo(center);
        }

        if (markerRef.current) {
            markerRef.current.position = center;
        }
    }, [center]);

    return <div ref={mapRef} style={mapContainerStyle} />;
};
