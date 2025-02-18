'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useMemo, useCallback } from 'react';
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
            const { Map, RenderingType } = await loader.importLibrary('maps');
            const _map = new Map(mapRef.current, {
                center: { lat: 12.9716, lng: 77.5946 },
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                disableDefaultUI: true,
                clickableIcons: false,
                mapId: '67af307b850dc59d',
                renderingType: RenderingType.VECTOR,
            });

            setMap(_map);
        };
    }, [setMap, mapRef]);

    useEffect(() => {
        initializeMap();

        return () => {
            mapRef.current = null; // Reset on unmount
        };
    }, [initializeMap, mapRef]);

    return (
        <div
            ref={localMapRef}
            style={{ height: '100%', width: '100%' }}
            {...props}
        />
    );
};

const AdvancedMarker: React.FC<{
	position?: { lat: number; lng: number } | null;
}> = ({ position }) => {
	const { map } = useMapStore();

	useEffect(() => {
		if (!map || !position) return;

		const initializeMarker = async () => {
			const { AdvancedMarkerElement } = await loader.importLibrary('marker');
			new AdvancedMarkerElement({
				position,
				map,
				title: 'Bangalore',
			});
		};

		initializeMarker();
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
