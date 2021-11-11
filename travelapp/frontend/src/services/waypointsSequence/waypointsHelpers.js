/* eslint-disable */
import { getWaypointsString } from '../helpers';

function formatWaypoint(waypoint) {
  const { name, lat, lng } = waypoint;

  return `${name};${lat},${lng}`;
}

function listWaypoints(waypoints) {
  let result = '';
  waypoints.forEach((waypoint, i) => {
    if (i === 0) return;
    const waypointString = `&destination${i}=${formatWaypoint(waypoint)}`;
    result += waypointString;
  });

  return result;
}

const BASE_URL = 'https://wse.ls.hereapi.com/2/findsequence.json';

export function getUrl(waypoints, transport) {
  if (process.env.NODE_ENV === 'production') {
    return `/.netlify/functions/sequence?transport=${transport}&waypoints=${getWaypointsString(waypoints)}`;
  }

  return `${BASE_URL}?mode=fastest;${transport}&apiKey=${process.env.REACT_APP_HERE_API_KEY}&start=${formatWaypoint(waypoints[0])}${listWaypoints(waypoints)}`;
}
