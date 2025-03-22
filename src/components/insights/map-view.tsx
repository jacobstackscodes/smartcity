"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapViewProps {
  center: { lat: number; lng: number };
  properties: { locationGeo: { coordinates: [number, number] }; price: number }[];
  crimes: { location: { coordinates: [number, number] } }[];
}

const mapStyles = { width: "100%", height: "400px" };

export default function MapView({ center, properties, crimes }: MapViewProps) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={10}>
        {properties.map((prop, i) => (
          <Marker
            key={`prop-${i}`}
            position={{ lat: prop.locationGeo.coordinates[1], lng: prop.locationGeo.coordinates[0] }}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
            title={`Price: ${prop.price} Lakhs`}
          />
        ))}
        {crimes.map((crime, i) => (
          <Marker
            key={`crime-${i}`}
            position={{ lat: crime.location.coordinates[1], lng: crime.location.coordinates[0] }}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}