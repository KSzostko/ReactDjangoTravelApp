import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/travel-routes/';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
};

const create = (travelRouteData) =>
  axios
    .post(BASE_URL, travelRouteData, {
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

const getRouteForStop = (travelStopId, role = 'destination') =>
  axios
    .get(`${BASE_URL}${travelStopId}/route-with-stop?role=${role}`, {
      headers,
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.detail));

export default { create, getByTravelId, getRouteForStop };
