export function formatWaypoint(waypoint) {
  const { name, lat, lng } = waypoint;

  return `${name};${lat},${lng}`;
}

export function listWaypoints(waypoints) {
  let result = '';
  waypoints.forEach((waypoint, i) => {
    if (i === 0) return;
    const waypointString = `&destination${i}=${formatWaypoint(waypoint)}`;
    result += waypointString;
  });

  return result;
}
