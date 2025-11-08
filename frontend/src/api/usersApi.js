import axios from "axios";

const base = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

// Add token to all requests
base.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllUsers = () => base.get("/users");
export const getUserById = (id) => base.get(`/users/${id}`);
export const updateUser = (id, userData) => base.put(`/users/${id}`, userData);
export const deleteUser = (id) => base.delete(`/users/${id}`);

