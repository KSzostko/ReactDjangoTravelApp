import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/travel-routes/`;

const create = (travelRouteData) =>
  axios
    .post(BASE_URL, travelRouteData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getByTravelId = (travelId) =>
  axios
    .get(`${BASE_URL}?travel-id=${travelId}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getRouteForStop = (travelStopId, role = 'destination') =>
  axios
    .get(`${BASE_URL}${travelStopId}/route-with-stop?role=${role}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.detail));

export default { create, getByTravelId, getRouteForStop };
