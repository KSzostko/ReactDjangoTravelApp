import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = 'http://localhost:8000/api/travel-stops/';

const create = (travelStopData) =>
  axios
    .post(BASE_URL, travelStopData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const update = (updatedData) =>
  axios
    .put(`${BASE_URL}${updatedData.id}/`, updatedData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const deleteStop = (travelStopId) =>
  axios
    .delete(`${BASE_URL}${travelStopId}/`, {
      headers: getHeaders(),
    })
    .then(() => travelStopId)
    .catch(({ response }) => Promise.reject(response.statusText));

const getByTravelId = (travelId) =>
  axios
    .get(`${BASE_URL}?travel-id=${travelId}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { create, update, getByTravelId, deleteStop };
