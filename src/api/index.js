// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-studio.onrender.com',
});

export default api;
