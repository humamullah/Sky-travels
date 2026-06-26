import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getDestinations = async (params) => {
  const { data } = await api.get('/destinations', { params });
  return data;
};

export const getDestinationBySlug = async (slug) => {
  const { data } = await api.get(`/destinations/${slug}`);
  return data;
};

export const getDestinationCategories = async () => {
  const { data } = await api.get('/destinations/categories');
  return data;
};

export const getBlogs = async (params) => {
  const { data } = await api.get('/blogs', { params });
  return data;
};

export const getBlogBySlug = async (slug) => {
  const { data } = await api.get(`/blogs/${slug}`);
  return data;
};

export const getResources = async (params) => {
  const { data } = await api.get('/resources', { params });
  return data;
};

export default api;
