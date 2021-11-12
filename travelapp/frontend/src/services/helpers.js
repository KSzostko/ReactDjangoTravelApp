export function getWaypointsString(waypoints) {
  return encodeURIComponent(JSON.stringify(waypoints.map(JSON.stringify)));
}
