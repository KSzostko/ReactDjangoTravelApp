import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/travel-stops/';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};

const create = (travelStopData) =>
  axios
    .post(BASE_URL, travelStopData, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const update = (updatedData) =>
  axios
    .put(`${BASE_URL}${updatedData.id}/`, updatedData, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

const getByTravelId = (travelId) =>
  axios
    .get(`${BASE_URL}?travel-id=${travelId}`, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.statusText));

export default { create, update, getByTravelId };
