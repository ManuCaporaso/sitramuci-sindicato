import axios from "axios";

// Crear instancia de Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // tu URL base
});

// Interceptor para agregar token a todas las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
