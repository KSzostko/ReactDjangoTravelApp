import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/travels/';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};

const getList = () =>
  axios
    .get(`${BASE_URL}`, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const create = (travelData) =>
  axios
    .post(BASE_URL, travelData, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getById = (id) =>
  axios
    .get(`${BASE_URL}${id}`, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { getList, create, getById };
