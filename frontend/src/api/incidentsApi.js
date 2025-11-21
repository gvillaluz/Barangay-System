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

export const getIncidents = () => base.get("/incidents");
export const createIncident = (data) => base.post("/incidents", data);
export const updateIncident = (id, data) => base.put(`/incidents/${id}`, data);
export const deleteIncident = (id) => base.delete(`/incidents/${id}`);
