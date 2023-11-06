import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env}/`,
});

export default api;