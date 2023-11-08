import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function MapPicker({selectedLocation,setSelectedLocation, setEnviar}) {
    
  
    function AddMarkerToClick() {
      const map = useMapEvents({
        click(e) {
          setSelectedLocation({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          });
          setEnviar(true);
        },
      });
      return selectedLocation === null ? null : (
        <Marker position={selectedLocation}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      );
      
    }
  
    return (
      <div style={{ width: '100%', height: '300px' }}>
        <MapContainer center={[4.5709, -74.2973]} zoom={6} style={{ width: '100%', height: '100%', zIndex: 0 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <AddMarkerToClick />
        </MapContainer>
      </div>
    );
  }
  
  export default MapPicker;





