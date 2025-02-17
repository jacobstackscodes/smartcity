'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useMemo } from 'react';
import { create } from 'zustand';

interface MapStore {
    map: google.maps.Map | null;
    mapRef: React.RefObject<HTMLDivElement | null>;
    setMap: (map: google.maps.Map) => void;
}

const useMapStore = create<MapStore>((set) => ({
    map: null,
    mapRef: { current: null },
    setMap: (map) => set({ map }),
}));

const loader = new Loader({
    id: 'google-maps-script',
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
});

const Map: React.FC<{
    children?: React.ReactNode;
}> = (props) => {
    const { setMap, mapRef } = useMapStore();
    const localMapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = localMapRef.current;
        }
    }, [mapRef]);

    const initializeMap = useMemo(() => {
        return async () => {
            if (!mapRef.current) return;
            const { Map } = await loader.importLibrary('maps');
            const _map = new Map(mapRef.current, {
                center: { lat: 12.9716, lng: 77.5946 },
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                disableDefaultUI: true,
                clickableIcons: false,
                mapId: '67af307b850dc59d',
            });
            
            setMap(_map);
        };
    }, [setMap, mapRef]);

    useEffect(() => {
        initializeMap();

        return () => {
            mapRef.current = null; // Reset on unmount
        };
    }, [initializeMap]);

    return (
        <div
            ref={localMapRef}
            style={{ height: '100%', width: '100%' }}
            {...props}
        />
    );
};

const AdvancedMarker: React.FC<{
    position: { lat: number; lng: number };
}> = ({ position }) => {
    const { map } = useMapStore();

    useEffect(() => {
        const initializeMarker = async () => {
            if (!map) return;
            const { AdvancedMarkerElement } =
                await loader.importLibrary('marker');
            new AdvancedMarkerElement({
                position: position ?? { lat: 12.9716, lng: 77.5946 },
                map: map,
                title: 'Bangalore',
            });
        };

        initializeMarker();
    }, [map, position]);

    return null;
};

export { Map, AdvancedMarker };
