import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/auth';

const register = (userData) =>
  axios
    .post(`${BASE_URL}/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    })
    .catch(({ response }) => Promise.reject(response.data));

const login = (userData) =>
  axios
    .post(`${BASE_URL}/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    })
    .catch(({ response }) => Promise.reject(response.data));

const logout = (token) =>
  axios
    .post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(({ data }) => {
      localStorage.removeItem('token');

      return data;
    })
    .catch(({ response }) => Promise.reject(response.data));

const getUserByToken = (token) =>
  axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data));

export default { register, login, logout, getUserByToken };
