import axios from "axios";

const base = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api" });

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

export const getDocuments = () => base.get("/documents");
export const getDocument = (id) => base.get(`/documents/${id}`);
export const createDocument = (payload) => base.post("/documents", payload);
export const updateDocument = (id, payload) => base.put(`/documents/${id}`, payload);
export const deleteDocument = (id) => base.delete(`/documents/${id}`);
