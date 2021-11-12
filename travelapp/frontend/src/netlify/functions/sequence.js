const axios = require('axios');

function formatWaypoint(waypoint) {
  const { name, lat, lng } = waypoint;

  return `${name};${lat},${lng}`;
}

function listWaypoints(waypoints) {
  let result = '';
  waypoints.forEach((waypoint, i) => {
    if (i === 0) return;
    const waypointString = `&destination${i}=${formatWaypoint(waypoint)}`;
    result += waypointString;
  });

  return result;
}

const BASE_URL = 'https://wse.ls.hereapi.com/2/findsequence.json';

module.exports.handler = async (e) => {
  try {
    const { waypoints, transport } = e.queryStringParameters;
    const adjustedWaypoints = JSON.parse(decodeURIComponent(waypoints)).map(
      JSON.parse
    );

    /* eslint-disable */
    const resp = await axios.get(
      `${BASE_URL}?mode=fastest;${transport}&apiKey=${process.env.REACT_APP_HERE_API_KEY}&start=${formatWaypoint(adjustedWaypoints[0])}${listWaypoints(adjustedWaypoints)}`
    )
      .then(({ data }) => data);
    /* eslint-enable */

    return {
      statusCode: 200,
      body: JSON.stringify(resp),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify(err?.response?.data) || err.toString(),
    };
  }
};
