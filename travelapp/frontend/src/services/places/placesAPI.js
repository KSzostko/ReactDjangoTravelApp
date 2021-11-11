import axios from 'axios';
import { getAllCategories } from './placesHelpers';

const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

// radius number is passed in meters
const findPlacesInRadius = ({
  radius,
  lat,
  lon,
  categoriesList = getAllCategories(),
}) =>
  axios
    .get(
      `/.netlify/functions/findInRadius?radius=${radius}&lat=${lat}&lon=${lon}&categoriesList=${categoriesList.toString()}`
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

const findPlacesInBox = ({
  latRange,
  lonRange,
  categoriesList = getAllCategories(),
}) =>
  axios
    .get(
      /* eslint-disable */
      `/.netlify/functions/findInBox?latData=${JSON.stringify(latRange)}&lonData=${JSON.stringify(lonRange)}&categoriesList=${categoriesList.toString()}`
      /* eslint-enable */
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

// Service based on GeoNames database. Places like region, city village, etc.
const findPlaceByName = (place) =>
  axios
    .get(`/.netlify/functions/findPlace?place=${place}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

const getPlaceDetails = (xid) =>
  axios
    .get(
      `${BASE_URL}/xid/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

export default {
  findPlacesInRadius,
  findPlacesInBox,
  findPlaceByName,
  getPlaceDetails,
};
