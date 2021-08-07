import axios from 'axios';
import { decode as decodePolyline } from '../../utils/flexiblePolylineCipher';
import { getWaypointString } from './routingHelpers';

const BASE_URL = 'https://router.hereapi.com/v8/routes';

const defaultOptions = { transport: 'car', returnType: 'polyline,summary' };

const calculateRoute = (waypoints, routeOptions = {}) => {
  const { transport, returnType } = { ...defaultOptions, ...routeOptions };
  /* eslint-disable */
  const intermediateWaypoints =
    waypoints.length > 2
      ? `${waypoints
        .slice(1, waypoints.length - 1)
        .map((point) => `&via=${getWaypointString(point)}`)
        .join('')}`
      : '';
  /* eslint-enable */

  return axios
    .get(
      `${BASE_URL}?transportMode=${transport}&return=${returnType}
      &origin=${getWaypointString(waypoints[0])}
      &destination=${getWaypointString(waypoints[waypoints.length - 1])}
      ${intermediateWaypoints}&apiKey=${process.env.REACT_APP_HERE_API_KEY}
    `.replaceAll(' ', '')
    )
    .then(({ data }) => {
      const route = data.routes[0].sections;

      return route.map(({ polyline, summary, transport: transportData }) => ({
        polylineData: decodePolyline(polyline),
        summary: {
          ...summary,
          ...transportData,
        },
      }));
    })
    .catch(({ response }) => {
      if (response.title) return Promise.reject(response.title);

      return Promise.reject(response.error);
    });
};

export default { calculateRoute };
