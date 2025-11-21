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

export const getHouseholds = async () => await base.get("/households");
export const createHousehold = async (data) => {
  try {
    const formData = new FormData();

    formData.append('household', JSON.stringify(data.newHousehold));
    formData.append('residents', JSON.stringify(data.initialResidents));

    data.initialResidents.forEach(r => formData.append('photo', r.photo));

    const response = await base.post('/households', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
}
export const updateHousehold = async (id, data) => await base.put(`/households/${id}`, data);
export const deleteHousehold = async (id) => await base.delete(`/households/${id}`);