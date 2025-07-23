// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // important for JWT cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptors
api.interceptors.request.use(
  (config) => {
    // You can attach auth headers if needed (for non-cookie JWT)
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here (401, 403, etc.)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirect to login.");
    }
    return Promise.reject(error);
  }
);

export default api;
