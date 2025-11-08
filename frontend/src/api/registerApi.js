import axios from "axios";

const base = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api" });

export const registerUser = (userData) => base.post("/auth/register", userData)

