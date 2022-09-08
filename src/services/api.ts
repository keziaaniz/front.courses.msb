import axios from 'axios';

const api = axios.create({
  baseURL: "https://paratestes.fun",
  timeout: 5000,
});

export default api;
