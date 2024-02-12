import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface OfficeMapProps {
  apiKey: string;
}

const OfficeMap: React.FC<OfficeMapProps> = ({ apiKey }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 40.7128,
    lng: -74.0060,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default OfficeMap;