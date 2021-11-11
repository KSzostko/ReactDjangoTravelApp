const axios = require('axios');

const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

module.exports.handler = async (e) => {
  try {
    const { radius, lat, lon, categoriesList } = e.queryStringParameters;

    /* eslint-disable */
    const resp = await axios
      .get(
        `${BASE_URL}?radius=${radius}&lat=${lat}&lon=${lon}&kinds=${categoriesList}&format=json&rate=2&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`
      )
      .then(({ data }) => data);
    /* eslint-disable */

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
