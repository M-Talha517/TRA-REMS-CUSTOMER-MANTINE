import { Container, Stack, Text } from "@mantine/core";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = ({ lat, lng }) => {
  console.log(lat, lng);
  return (
    <MapContainer
      style={{
        height: "400px",
        width: "100%",
      }}
      center={[lat, lng]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <Stack spacing={0}>
            <Text weight={700} align="center">
              Location <br />
            </Text>
            <Text>
              Lat: {lat} <br /> Lng: {lng}
            </Text>
          </Stack>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
