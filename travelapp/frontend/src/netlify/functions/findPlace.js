const axios = require('axios');

const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

module.exports.handler = async (e) => {
  try {
    const place = encodeURIComponent(e.queryStringParameters.place);

    const resp = await axios
      .get(
        `${BASE_URL}/geoname?name=${place}&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`
      )
      .then(({ data }) => data);

    return {
      statusCode: 200,
      body: JSON.stringify(resp),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
