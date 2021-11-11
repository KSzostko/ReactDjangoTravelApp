/* eslint-disable */
import { getWaypointsString } from '../helpers';

function getWaypointString(waypoint) {
  return `${waypoint.lat},${waypoint.lon}`;
}

const BASE_URL = 'https://router.hereapi.com/v8/routes';

export function getUrl(waypoints, routeOptions) {
  const defaultOptions = { transport: 'car', returnType: 'polyline,summary' };
  const { transport, returnType } = { ...defaultOptions, ...routeOptions };

  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/calculateRoute?transport=${transport}&returnType=${returnType}&waypoints=${getWaypointsString(waypoints)}`
  }

  const intermediateWaypoints =
    waypoints.length > 2
      ? `${waypoints
        .slice(1, waypoints.length - 1)
        .map((point) => `&via=${getWaypointString(point)}`)
        .join('')}`
      : '';

  return `${BASE_URL}?transportMode=${transport}&return=${returnType}&origin=${getWaypointString(waypoints[0])}&destination=${getWaypointString(waypoints[waypoints.length - 1])}${intermediateWaypoints}&apiKey=${process.env.REACT_APP_HERE_API_KEY}`
}
