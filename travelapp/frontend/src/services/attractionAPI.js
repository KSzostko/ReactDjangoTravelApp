import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/attractions/';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};

const create = (attractionData) =>
  axios
    .post(BASE_URL, attractionData, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getByXid = (xid) =>
  axios
    .get(`${BASE_URL}${xid}/search-by-xid/`, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { create, getByXid };
