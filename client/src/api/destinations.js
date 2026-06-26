import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getDestinations = async () => {
  const { data } = await api.get('/destinations');
  return data;
};

export const getDestination = async (id) => {
  const { data } = await api.get(`/destinations/${id}`);
  return data;
};

export const createDestination = async (formData) => {
  const { data } = await api.post('/destinations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
