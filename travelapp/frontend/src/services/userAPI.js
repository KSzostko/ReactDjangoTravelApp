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
    .catch(({ message }) => message);

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
    .catch(({ message }) => message);

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
    .catch(({ message }) => message);

const getUserByToken = (token) =>
  axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(({ message }) => message);

export default { register, login, logout, getUserByToken };
