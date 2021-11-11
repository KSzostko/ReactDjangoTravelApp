import axios from 'axios';
import { getUrl } from './waypointsHelpers';

const getOptimalSequence = (waypoints, transport = 'car') =>
  axios
    .get(getUrl(waypoints, transport))
    .then(({ data }) => {
      const { distance, time, interconnections } = data.results[0];
      return { distance, time, interconnections };
    })
    .catch(({ response }) => Promise.reject(response.error));

export default { getOptimalSequence };
