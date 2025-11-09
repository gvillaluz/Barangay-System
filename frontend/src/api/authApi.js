import axios from "axios";

const base = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api" });

export const loginUser = async (userData) => await base.post("/auth/login", userData);

export const registerUser = async (userData) => await base.post("/auth/register", userData);