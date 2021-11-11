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
      `${BASE_URL}/bbox?
        &lat_min=${latRange.min}&lat_max=${latRange.max}
        &lon_min=${lonRange.min}&lon_max=${lonRange.max}
        &kinds=${categoriesList.toString()}&format=json&rate=2
        &apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

// Service based on GeoNames database. Places like region, city village, etc.
const findPlaceByName = (place) =>
  axios
    .get(
      `${BASE_URL}/geoname?name=${place}&apikey=${process.env.REACT_APP_OPEN_TRIP_MAP_API_KEY}`
    )
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
