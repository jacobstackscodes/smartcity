'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { create } from 'zustand';

interface MapStore {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map) => void;
    position: { latitude: number; longitude: number } | null;
    setPosition: (position: { latitude: number; longitude: number }) => void;
}

const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map) => set({ map }),
    position: null,
    setPosition: (position) => set({ position }),
}));

const loader = new Loader({
    id: 'google-maps-script',
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
});

const Map: React.FC<{
    position: { latitude: number; longitude: number };
    children?: React.ReactNode;
}> = ({ position, children }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { map, setMap, setPosition } = useMapStore();

    // ✅ Stable function reference with `useMemo()`
    const initializeMap = useMemo(() => {
        return async () => {
            if (!mapRef.current) return;
            const { Map, RenderingType } = await loader.importLibrary('maps');
            const _map = new Map(mapRef.current, {
                center: {
                    lat: position.latitude,
                    lng: position.longitude,
                },
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                disableDefaultUI: true,
                clickableIcons: false,
                mapId: '67af307b850dc59d',
                renderingType: RenderingType.VECTOR,
            });

            setMap(_map);
            setPosition(position); // ✅ Initialize position

            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(_map);
        };
    }, [position, setMap, setPosition, mapRef]);

    useEffect(() => {
        if (!map) {
            initializeMap();
        }
    }, [map, initializeMap]);

    useEffect(() => {
        if (map && position) {
            map.panTo({ lat: position.latitude, lng: position.longitude });
            setPosition(position);
        }
    }, [map, position, setPosition]);

    return (
        <div ref={mapRef} style={{ height: '100%', width: '100%' }}>
            {children}
        </div>
    );
};

const AdvancedMarker: React.FC = () => {
    const { map, position } = useMapStore();
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
        null,
    );

    useEffect(() => {
        if (!map || !position) return;

        loader.importLibrary('marker').then(({ AdvancedMarkerElement }) => {
            if (!markerRef.current) {
                markerRef.current = new AdvancedMarkerElement({ map });
            }
            markerRef.current.position = new google.maps.LatLng(
                position.latitude,
                position.longitude,
            );
        });
    }, [map, position]);

    return null;
};

const Heatmap: React.FC = () => {
    const { map } = useMapStore();

    const renderHeatmap = useCallback(
        (tiles) => {
            if (!map) return;

            const tileLayer = new google.maps.ImageMapType({
                getTileUrl: (coord, zoom) => {
                    const tile = tiles.find(
                        (t) => t.x === coord.x && t.y === coord.y,
                    );
                    return tile ? tile.url : null;
                },
                tileSize: new google.maps.Size(256, 256),
                opacity: 0.6,
            });

            map.overlayMapTypes.clear();
            map.overlayMapTypes.push(tileLayer);
        },
        [map],
    );

    useEffect(() => {
        if (!map) return;

        const updateHeatmapTiles = async () => {
            const zoom = map.getZoom();
            const bounds = map.getBounds();
            if (!bounds) return;

            const ne = bounds.getNorthEast(); // Top-right corner
            const sw = bounds.getSouthWest(); // Bottom-left corner

            console.log('Fetching heatmap tiles for:', {
                zoom,
                ne: { lat: ne.lat(), lng: ne.lng() },
                sw: { lat: sw.lat(), lng: sw.lng() },
            });
        };

        // Attach listeners
        map.addListener('idle', updateHeatmapTiles);
        map.addListener('zoom_changed', updateHeatmapTiles);

        return () => {
            google.maps.event.clearListeners(map, 'idle');
            google.maps.event.clearListeners(map, 'zoom_changed');
        };
    }, [map]);

    return null;
};

export { Map, AdvancedMarker, Heatmap };
