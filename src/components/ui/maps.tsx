'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';

interface MapStore {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
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

    useEffect(() => {
        if (!mapRef.current || map) return;

        (async () => {
            const { Map, RenderingType } = await loader.importLibrary('maps');
            const _map = new Map(mapRef.current!, {
                center: { lat: position.latitude, lng: position.longitude },
                zoom: 14,
                disableDefaultUI: true,
                clickableIcons: false,
                mapId: '67af307b850dc59d',
                renderingType: RenderingType.VECTOR,
            });

            setMap(_map);
            setPosition(position);

            new google.maps.TrafficLayer().setMap(_map);
        })();
    }, [map, setMap, setPosition, position]);

    useEffect(() => {
        if (map) {
            map.panTo({ lat: position.latitude, lng: position.longitude });
            setPosition(position);
        }
    }, [map, position, setPosition]);

    useEffect(() => () => setMap(null), [setMap]);

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
            if (markerRef.current) {
                markerRef.current.map = null; // Detach old marker
            }

            markerRef.current = new AdvancedMarkerElement({
                map,
                position: new google.maps.LatLng(
                    position.latitude,
                    position.longitude,
                ),
            });
        });

        return () => {
            if (markerRef.current) {
                markerRef.current.map = null;
                markerRef.current = null;
            }
        };
    }, [map, position.latitude, position.longitude, title, color]);

    return null;
};

// Multi-Marker Map Component
interface MarkerData {
    position: { latitude: number; longitude: number };
    title: string;
    color: string;
  }

const MultiMarkerMap: React.FC<{
    position: { latitude: number; longitude: number };
    markers: MarkerData[];
  }> = ({ position, markers }) => {
    return (
      <Map position={position}>
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={marker.position}
            title={marker.title}
            color={marker.color}
          />
        ))}
      </Map>
    );
  };

export { Map, AdvancedMarker, MultiMarkerMap };
