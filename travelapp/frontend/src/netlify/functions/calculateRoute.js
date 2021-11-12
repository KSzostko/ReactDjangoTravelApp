const axios = require('axios');

function getWaypointString(waypoint) {
  return `${waypoint.lat},${waypoint.lon}`;
}

const BASE_URL = 'https://router.hereapi.com/v8/routes';

module.exports.handler = async (e) => {
  try {
    const {
      waypoints: waypointsString,
      transport,
      returnType,
    } = e.queryStringParameters;
    console.log(waypointsString);
    const waypoints = JSON.parse(decodeURIComponent(waypointsString)).map(
      JSON.parse
    );
    console.log(waypoints);
    console.log(e);

    /* eslint-disable */
    const intermediateWaypoints =
      waypoints.length > 2
        ? `${waypoints
          .slice(1, waypoints.length - 1)
          .map((point) => `&via=${getWaypointString(point)}`)
          .join('')}`
        : '';
    /* eslint-enable */

    /* eslint-disable */
    const resp = await axios
      .get(
        `${BASE_URL}?transportMode=${transport}&return=${returnType}&origin=${getWaypointString(waypoints[0])}&destination=${getWaypointString(waypoints[waypoints.length - 1])}${intermediateWaypoints}&apiKey=${process.env.REACT_APP_HERE_API_KEY}`
      )
      .then(({ data }) => data);
    /* eslint-enable */

    return {
      statusCode: 200,
      body: JSON.stringify(resp),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: JSON.stringify(err?.response?.data) || err.toString(),
    };
  }
};
