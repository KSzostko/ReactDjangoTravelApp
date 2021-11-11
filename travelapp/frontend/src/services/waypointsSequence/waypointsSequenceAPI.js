import axios from 'axios';
import { getWaypointsString } from './waypointsHelpers';

const getOptimalSequence = (waypoints, transport = 'car') =>
  /* eslint-disable */
  axios.get(
    `/.netlify/functions/sequence?transport=${transport}&waypoints=${getWaypointsString(waypoints)}`

  )
    /* eslint-enable */
    .then(({ data }) => {
      const { distance, time, interconnections } = data.results[0];
      return { distance, time, interconnections };
    })
    .catch(({ response }) => Promise.reject(response.error));

export default { getOptimalSequence };
