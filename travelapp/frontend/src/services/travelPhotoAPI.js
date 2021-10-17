import axios from 'axios';
import { getHeaders } from 'utils';

const BASE_URL = 'http://localhost:8000/api/travel-photos/';

const getList = (sortBy = '') =>
  axios
    .get(`${BASE_URL}?sortBy=${sortBy}`, {
      headers: getHeaders(),
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const create = (travelPhotoData) => {
  const formData = new FormData();
  Object.entries(travelPhotoData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return axios
    .post(BASE_URL, formData, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));
};

const deletePhoto = (travelPhotoId) =>
  axios
    .delete(`${BASE_URL}${travelPhotoId}/`, {
      headers: getHeaders(),
    })
    .then(() => travelPhotoId)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { getList, create, deletePhoto };
