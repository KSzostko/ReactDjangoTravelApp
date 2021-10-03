import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from 'styled-components';
import { notification, Spin } from 'antd';
import { useErrorNotification } from 'utils';
import mapConstants from 'setup/mapConstants';
import { getRoute } from 'redux/map/actions/getRoute/thunk';
import { getTravelRoutes } from 'redux/travels/actions/getTravelRoutes/thunk';
import MapEvents from './MapEvents/MapEvents';
import SearchPlace from './SearchPlace';
import MapMarker from './MapMarker';
import MapModal from './MapModal';
import TravelPeriodModal from './TravelPeriodModal/TravelPeriodModal';
import RoutePolyline from './RoutePolyline/RoutePolyline';
import RouteOptions from './RouteOptions';
import { adjustRouteData } from './helpers';

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  const { travelId } = useParams();
  const { locations, isLoading, error } = useSelector((state) => state.map);
  const { data: routeData, error: routeError } = useSelector(
    (state) => state.map.getRoute
  );
  const { isOpen: isTravelPeriodModalOpen } = useSelector(
    (state) => state.travelPeriodModal
  );
  const { isOpen: isTravelStopModalOpen } = useSelector(
    (state) => state.travelStopModal
  );
  const { data: currentTravelRoutes, error: travelRouteError } = useSelector(
    (state) => state.travels.getTravelRoutes
  );

  useErrorNotification(error, 'Błąd podczas ładowania danych do mapy');
  useErrorNotification(routeError, 'Błąd podczas wyznaczania trasy');
  useErrorNotification(
    travelRouteError,
    'Błąd podczas ładowania trasy podróży'
  );

  useEffect(() => {
    if (!isTravelPeriodModalOpen && !isTravelStopModalOpen) {
      dispatch(getTravelRoutes(travelId));
    }
  }, [dispatch, travelId, isTravelPeriodModalOpen, isTravelStopModalOpen]);

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
        <RouteOptions
          routeWaypoints={routeWaypoints}
          handleShowRouteFn={handleShowRoute}
          handleRemoveRouteFn={handleRemoveRoute}
        />
      )}
      {showRoute && <RoutePolyline routeData={routeData} />}
      {/* TODO maybe separate each route to a different polyline */}
      {/* TODO maybe separate routes for each day */}
      {currentTravelRoutes.length > 0 && (
        <RoutePolyline
          isTravelRoute
          routeData={adjustRouteData(currentTravelRoutes, true)}
        />
      )}

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
