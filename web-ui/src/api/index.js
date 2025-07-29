import axios from 'axios';

const BASE_URL = '/api';

export const register = (data) => axios.post(`${BASE_URL}/auth/register`, data);

export const getBlindBoxes = (params) => axios.get(`${BASE_URL}/blindbox`, { params });
export const getBlindBoxDetail = (id) => axios.get(`${BASE_URL}/blindbox/${id}`);
export const searchBlindBoxes = (q) => axios.get(`${BASE_URL}/blindbox/search`, { params: { q } });
export const drawBlindBox = (id) => {
  const token = localStorage.getItem('token');
  return axios.post(`/api/blindbox/${id}/draw`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createOrder = (data) => axios.post(`${BASE_URL}/order`, data);
export const getOrders = () => axios.get(`${BASE_URL}/order`);
export const getOrderDetail = (id) => axios.get(`${BASE_URL}/order/${id}`);
export const cancelOrder = (id) => axios.post(`${BASE_URL}/order/${id}/cancel`);

export const createShow = (data) => axios.post(`${BASE_URL}/show`, data);
export const getShows = () => axios.get(`${BASE_URL}/show`);
export const getShowDetail = (id) => axios.get(`${BASE_URL}/show/${id}`);
export const deleteShow = (id) => axios.delete(`${BASE_URL}/show/${id}`);

export const getMe = () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
