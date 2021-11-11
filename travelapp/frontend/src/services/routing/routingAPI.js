import axios from 'axios';
import { decodePolyline } from 'utils';
import { getUrl } from './routingHelpers';

const calculateRoute = (waypoints, routeOptions = {}) =>
  axios
    .get(getUrl(waypoints, routeOptions))
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

export default { calculateRoute };
