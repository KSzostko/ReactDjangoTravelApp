import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = 'http://localhost:8000/api/travels/';

const getList = () =>
  axios
    .get(`${BASE_URL}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const create = (travelData) =>
  axios
    .post(BASE_URL, travelData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const update = (travelData) =>
  axios
    .put(`${BASE_URL}${travelData.id}/`, travelData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getById = (id) =>
  axios
    .get(`${BASE_URL}${id}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const deleteTravel = (travelId) =>
  axios
    .delete(`${BASE_URL}${travelId}`, {
      headers: getHeaders(),
    })
    .then(() => travelId)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { getList, create, update, getById, deleteTravel };
