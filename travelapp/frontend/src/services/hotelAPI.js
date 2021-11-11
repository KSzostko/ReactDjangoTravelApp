import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/hotels/`;

const create = (hotelData) =>
  axios
    .post(BASE_URL, hotelData, {
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

const getByXid = (xid) =>
  axios
    .get(`${BASE_URL}${xid}/search-by-xid/`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { create, getById, getByXid };
