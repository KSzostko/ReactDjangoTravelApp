import { decodePolyline } from 'utils';

export function adjustRouteData(routeData, isTravelRoute = false) {
  if (!isTravelRoute) return routeData;

  return routeData.map(
    ({ polyline, distance, travel_time: travelTime, transport, ...rest }) => ({
      polylineData: decodePolyline(polyline),
      summary: {
        baseDuration: travelTime,
        length: distance,
        mode: transport,
      },
      ...rest,
    })
  );
}
