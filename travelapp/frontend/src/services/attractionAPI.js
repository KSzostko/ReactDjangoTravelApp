import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/attractions/`;

const create = (attractionData) =>
  axios
    .post(BASE_URL, attractionData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getByXid = (xid) =>
  axios
    .get(`${BASE_URL}${xid}/search-by-xid/`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { create, getByXid };
