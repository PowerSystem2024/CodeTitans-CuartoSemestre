import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Crear una instancia de Axios con configuración predeterminada
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
