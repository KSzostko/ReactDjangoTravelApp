import axios from 'axios';
import {
  getAllCategories,
  getFindInRadiusUrl,
  getFindInBoxUrl,
  getFindByNameUrl,
  getDetailsUrl,
} from './placesHelpers';

// radius number is passed in meters
const findPlacesInRadius = ({
  radius,
  lat,
  lon,
  categoriesList = getAllCategories(),
}) =>
  axios
    .get(getFindInRadiusUrl(radius, lat, lon, categoriesList))
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

const findPlacesInBox = ({
  latRange,
  lonRange,
  categoriesList = getAllCategories(),
}) =>
  axios
    .get(getFindInBoxUrl(latRange, lonRange, categoriesList))
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

// Service based on GeoNames database. Places like region, city village, etc.
const findPlaceByName = (place) =>
  axios
    .get(getFindByNameUrl(place))
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

const getPlaceDetails = (xid) =>
  axios
    .get(getDetailsUrl(xid))
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.error));

export default {
  findPlacesInRadius,
  findPlacesInBox,
  findPlaceByName,
  getPlaceDetails,
};
