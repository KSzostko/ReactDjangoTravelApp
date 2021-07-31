import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from 'styled-components';
import { Spin } from 'antd';
import mapConstants from '../../setup/mapConstants';
import { useErrorNotification } from '../../utils/useErrorNotification';
import MapEvents from './MapEvents';
import SearchPlace from './SearchPlace';
import MapMarker from './MapMarker';
import MapModal from './MapModal';

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
  const { locations, isLoading, error } = useSelector((state) => state.map);

  useErrorNotification(error, 'Błąd podczas ładowania danych do mapy');

  return (
    <MapContainer
      style={{ height: '100%', position: 'relative' }}
      center={defaultCenter}
      zoomControl={false}
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
      <ZoomControl position="bottomright" />
      <MapEvents />
      <MapModal />

      <SearchPlace />
      {isLoading ? (
        <StyledSpinner />
      ) : (
        <MarkerClusterGroup
          spiderfyOnMaxZoom={spiderifyOnMaxZoom}
          maxClusterRadius={maxClusterRadius}
          showCoverageOnHover={false}
          animateAddingMarkers
          removeOutsideVisibleBounds
          chunkedLoading
        >
          {locations.map(({ xid, point, name }) => (
            <MapMarker key={xid} xid={xid} point={point} name={name} />
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
}

export default Map;
