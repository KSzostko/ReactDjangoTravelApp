import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import mapConstants from '../../setup/mapConstants';
import MapEvents from './MapEvents';

function Map() {
  const {
    zoom,
    maxZoom,
    minZoom,
    maxClusterRadius,
    maxBoundsViscosity,
    spiderifyOnMaxZoom,
    defaultCenter,
  } = mapConstants;
  // TODO: handle errors and loading state
  const { locations } = useSelector((state) => state.map);

  return (
    <MapContainer
      style={{ height: '100%' }}
      center={defaultCenter}
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
      <MapEvents />

      <MarkerClusterGroup
        spiderfyOnMaxZoom={spiderifyOnMaxZoom}
        maxClusterRadius={maxClusterRadius}
        showCoverageOnHover={false}
        animateAddingMarkers
        removeOutsideVisibleBounds
        chunkedLoading
      >
        {locations.map(({ xid, point }) => (
          <Marker key={xid} position={point} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
