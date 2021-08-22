import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from 'styled-components';
import { Button, notification, Spin, Collapse } from 'antd';
import { cutText, useErrorNotification } from '../../utils';
import mapConstants from '../../setup/mapConstants';
import { getRoute } from '../../redux/map/actions/getRoute/thunk';
import MapEvents from './MapEvents';
import SearchPlace from './SearchPlace';
import MapMarker from './MapMarker';
import MapModal from './MapModal';
import TravelPeriodModal from './TravelPeriodModal';
import RoutePolyline from './RoutePolyline';

const { Panel } = Collapse;

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: ${(props) => (props.danger ? '90px' : '55px')};
  left: 64px;
  width: 150px;
  z-index: 999;

  @media (min-width: 500px) {
    top: ${(props) => (props.danger ? '55px' : '16px')};
    left: auto;
    right: 16px;
  }
`;

const RouteCollapse = styled(Collapse)`
  position: absolute;
  top: 125px;
  left: 64px;
  width: 150px;
  z-index: 999;

  @media (min-width: 500px) {
    top: 95px;
    left: auto;
    right: 16px;
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
`;

function Map() {
  const dispatch = useDispatch();
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
  const {
    data: routeData,
    isLoading: isRouteLoading,
    error: routeError,
  } = useSelector((state) => state.map.getRoute);

  useErrorNotification(error, 'Błąd podczas ładowania danych do mapy');
  useErrorNotification(routeError, 'Błąd podczas wyznaczania trasy');

  const [showRoute, setShowRoute] = useState(false);
  const [routeWaypoints, setRouteWaypoints] = useState([]);

  function addRouteWaypoint(waypoint) {
    setRouteWaypoints((prevWaypoints) => [...prevWaypoints, waypoint]);
  }

  function clearRouteWaypoints() {
    setRouteWaypoints([]);
  }

  function removeRouteWaypoint(waypoint) {
    const index = routeWaypoints.findIndex(
      (point) => point.lat === waypoint.lat && point.lon === waypoint.lon
    );

    if (index === -1) {
      notification.error({
        message: 'Nie udało się usunąć punktu z trasy',
        description: 'Trasa nie zawiera danego punktu',
      });
      return;
    }

    setRouteWaypoints((prevWaypoints) => [
      ...prevWaypoints.slice(0, index),
      ...prevWaypoints.slice(index + 1),
    ]);
  }

  function hasWaypoint(waypoint) {
    if (waypoint === undefined) return false;
    return (
      routeWaypoints.findIndex(
        (point) => point.lat === waypoint.lat && point.lon === waypoint.lon
      ) !== -1
    );
  }

  function handleRemoveRoute() {
    clearRouteWaypoints();
    setShowRoute(false);
  }

  async function handleShowRoute() {
    await dispatch(getRoute({ waypoints: routeWaypoints }));
    setShowRoute(true);
  }

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
      <MapModal
        addRouteWaypointFn={addRouteWaypoint}
        removeRouteWaypointFn={removeRouteWaypoint}
        hasWaypointFn={hasWaypoint}
      />
      <TravelPeriodModal />

      <SearchPlace />
      {routeWaypoints.length > 1 && (
        <>
          <StyledButton
            type="primary"
            disabled={isRouteLoading}
            onClick={handleShowRoute}
          >
            {isRouteLoading ? 'Wyznaczam...' : 'Wyznacz trasę'}
          </StyledButton>
          <StyledButton
            danger
            type="primary"
            disabled={isRouteLoading}
            onClick={handleRemoveRoute}
          >
            Wyczyść trasę
          </StyledButton>
          <RouteCollapse accordion expandIconPosition="right">
            <Panel header="Wybrana trasa">
              <StyledList>
                {routeWaypoints.map(({ xid, name }) => (
                  <li key={xid}>{cutText(name, 15)}</li>
                ))}
              </StyledList>
            </Panel>
          </RouteCollapse>
        </>
      )}
      {showRoute && <RoutePolyline routeData={routeData} />}

      {isLoading ? (
        <StyledSpinner />
      ) : (
        <MarkerClusterGroup
          spiderfyOnMaxZoom={spiderifyOnMaxZoom}
          maxClusterRadius={maxClusterRadius}
          disableClusteringAtZoom={maxZoom}
          showCoverageOnHover={false}
          animateAddingMarkers
          removeOutsideVisibleBounds
          chunkedLoading
        >
          {locations.map(({ xid, point, name }) => (
            <MapMarker
              key={xid}
              xid={xid}
              point={point}
              name={name}
              selected={hasWaypoint(point)}
            />
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
}

export default Map;
