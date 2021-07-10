import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import mapConstants from '../setup/mapConstants';
import AuthLayout from '../components/AuthLayout';

function PlanTravelView() {
  const {
    zoom,
    maxZoom,
    minZoom,
    maxClusterRadius,
    maxBoundsViscosity,
    spiderifyOnMaxZoom,
    defaultCenter,
  } = mapConstants;

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  return (
    <AuthLayout mapView>
      <MapContainer
        style={{ height: '100%' }}
        center={mapCenter}
        zoom={zoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        maxBoundsViscosity={maxBoundsViscosity}
        scrollWheelZoom
        preferCanvas
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          spiderfyOnMaxZoom={spiderifyOnMaxZoom}
          maxClusterRadius={maxClusterRadius}
          showCoverageOnHover={false}
          animateAddingMarkers
          removeOutsideVisibleBounds
          chunkedLoading
        >
          <Marker position={[49.8397, 24.0297]} />
          <Marker position={[52.2297, 21.0122]} />
          <Marker position={[51.5074, -0.0901]} />
        </MarkerClusterGroup>
      </MapContainer>
    </AuthLayout>
  );
}

export default PlanTravelView;
