export function getWaypointsString(waypoints) {
  console.table(waypoints);
  const result = waypoints.map(JSON.stringify).join(';');
  console.log(result);
  return result;
}
