'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useCallback } from 'react';
import { create } from 'zustand';

interface MapStore {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
}

interface Position {
    latitude: number;
    longitude: number;
}

const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map) => set({ map }),
}));

const loader = new Loader({
    id: 'google-maps-script',
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
});

const Map: React.FC<{ position: Position; children?: React.ReactNode }> = ({
    position,
    children,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { map, setMap } = useMapStore();

    const initializeMap = useCallback(async () => {
        if (!mapRef.current || map) return;

        const { Map, RenderingType } = await loader.importLibrary('maps');

        const newMap = new Map(mapRef.current, {
            center: { lat: position.latitude, lng: position.longitude },
            zoom: 14,
            disableDefaultUI: true,
            clickableIcons: false,
            mapId: '67af307b850dc59d',
            renderingType: RenderingType.VECTOR,
        });
        setMap(newMap);
    }, [map, setMap]);

    useEffect(() => {
        initializeMap();

        return () => {
            mapRef.current = null;
            setMap(null);
        };
    }, [initializeMap, map, setMap]);

    useEffect(() => {
        if (map) {
            map.setCenter({ lat: position.latitude, lng: position.longitude });
        }
    }, [map, position.latitude, position.longitude]);

    return (
        <div ref={mapRef} className="size-full">
            {children}
        </div>
    );
};

const TrafficLayer: React.FC = () => {
    const { map } = useMapStore();

    useEffect(() => {
        if (!map) return;

        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }, [map]);

    return null;
};

const AdvancedMarker: React.FC<{ position: Position }> = ({ position }) => {
    const { map } = useMapStore();
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
        null,
    );

    const initializeMarker = useCallback(async () => {
        if (!map || markerRef.current) return;

        const { AdvancedMarkerElement } = await loader.importLibrary('marker');
        const marker = new AdvancedMarkerElement({
            map,
            position: { lat: position.latitude, lng: position.longitude },
        });
        markerRef.current = marker;
    }, [map, position.latitude, position.longitude]);

    useEffect(() => {
        if (map && !markerRef.current) {
            initializeMarker();
        }

        return () => {
            if (markerRef.current) {
                markerRef.current.map = null;
                markerRef.current = null;
            }
        };
    }, [map]);

    useEffect(() => {
        if (markerRef.current && map) {
            markerRef.current.position = {
                lat: position.latitude,
                lng: position.longitude,
            };
            markerRef.current.map = map;
        }
    }, [map, position.latitude, position.longitude]);

    return null;
};

export { Map, AdvancedMarker, TrafficLayer };
