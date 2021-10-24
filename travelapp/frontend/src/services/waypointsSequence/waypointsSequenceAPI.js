import axios from 'axios';
import { formatWaypoint, listWaypoints } from './waypointsHelpers';

const BASE_URL = 'https://wse.ls.hereapi.com/2/findsequence.json';

const getOptimalSequence = (waypoints, transport = 'car') =>
  /* eslint-disable */
  axios.get(
    `${BASE_URL}?mode=fastest;${transport}&apiKey=${process.env.REACT_APP_HERE_API_KEY}
    &start=${formatWaypoint(waypoints[0])}${listWaypoints(waypoints)}
    `
  )
    /* eslint-enable */
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(({ response }) => Promise.reject(response.error));

export default { getOptimalSequence };
