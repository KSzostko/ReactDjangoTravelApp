import axios from 'axios';
import { getAllCategories } from './placesHelpers';

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
    .get(`/.netlify/functions/placeDetails?xid=${xid}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

export default {
  findPlacesInRadius,
  findPlacesInBox,
  findPlaceByName,
  getPlaceDetails,
};
