import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = 'http://localhost:8000/api/travel-photos/';

const getList = () =>
  axios
    .get(BASE_URL, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const create = (travelPhotoData) =>
  axios
    .post(BASE_URL, travelPhotoData, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const deletePhoto = (travelPhotoId) =>
  axios
    .delete(`${BASE_URL}${travelPhotoId}/`, {
      headers: getHeaders(),
    })
    .then(() => travelPhotoId)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { getList, create, deletePhoto };
