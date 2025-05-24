import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/signup/`, userData);
  if (response.status === 400) {
    throw new Error(response.data.message || 'Invalid input. Please check your details.');
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
  if (response.status === 400) {
    throw new Error(response.data.message || 'Invalid login credentials. Please try again.');
  }
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_BASE_URL}/refresh/`, { refresh: refreshToken });
  return response.data;
};