import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

export default api;