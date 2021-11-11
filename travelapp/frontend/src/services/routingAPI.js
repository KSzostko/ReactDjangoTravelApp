import axios from 'axios';
import { decodePolyline } from '../utils';
import { getWaypointsString } from './helpers';

const defaultOptions = { transport: 'car', returnType: 'polyline,summary' };

const calculateRoute = (waypoints, routeOptions = {}) => {
  const { transport, returnType } = { ...defaultOptions, ...routeOptions };

  return axios
    .get(
      /* eslint-disable */
      `/.netlify/functions/calculateRoute?transport=${transport}&returnType=${returnType}&waypoints=${getWaypointsString(waypoints)}`
      /* eslint-enable */
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
