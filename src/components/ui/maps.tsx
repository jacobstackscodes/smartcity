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
        const _map = new Map(mapRef.current, {
            center: { lat: position.latitude, lng: position.longitude },
            zoom: 14,
            disableDefaultUI: true,
            clickableIcons: false,
            mapId: '67af307b850dc59d', // Replace with your map ID
            renderingType: RenderingType.VECTOR,
        });

        setMap(_map);
    }, [setMap, mapRef]);

    // Initialize the map once
    useEffect(() => {
        initializeMap();

        return () => {
            mapRef.current = null;
            setMap(null);
        };
    }, [map, setMap, position]);

    // Pan to new position when it changes
    useEffect(() => {
        if (!map) return;
        const currentCenter = map.getCenter();
        if (
            currentCenter &&
            (currentCenter.lat() !== position.latitude ||
                currentCenter.lng() !== position.longitude)
        ) {
            map.panTo({ lat: position.latitude, lng: position.longitude });
        }
    }, [map, position]);

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

        return () => {
            trafficLayer.setMap(null);
        };
    }, [map]);

    return null;
};

const AdvancedMarker: React.FC<{ position: Position }> = ({ position }) => {
    const { map } = useMapStore();
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
        null,
    );

    // Create the marker when map is available
    useEffect(() => {
        if (!map) return;

        loader.importLibrary('marker').then(({ AdvancedMarkerElement }) => {
            if (!markerRef.current) {
                markerRef.current = new AdvancedMarkerElement({
                    map,
                    position: new google.maps.LatLng(
                        position.latitude,
                        position.longitude,
                    ),
                });
            }
        });

        return () => {
            if (markerRef.current) {
                markerRef.current.map = null;
                markerRef.current = null;
            }
        };
    }, [map]);

    // Update marker position when position changes
    useEffect(() => {
        if (markerRef.current && position) {
            markerRef.current.position = new google.maps.LatLng(
                position.latitude,
                position.longitude,
            );
        }
    }, [position]);

    return null;
};

export { Map, AdvancedMarker, TrafficLayer };
