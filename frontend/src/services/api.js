import axios from "axios";


const API_BASE = import.meta?.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"; // adjust to your server


export const api = axios.create({
baseURL: API_BASE,
headers: { "Content-Type": "application/json" },
});


// Attach JWT from localStorage
api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


// Basic error normalization
export const unwrap = async (promise) => {
try { const { data } = await promise; return [data, null]; }
catch (err) { return [null, err?.response?.data || { message: err.message }]; }
};