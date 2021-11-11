export function getWaypointsString(waypoints) {
  return waypoints.map(JSON.stringify).join(';');
}
