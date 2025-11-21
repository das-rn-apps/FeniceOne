import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://seonebodev.sunedison.in/bo/api/lead/updateLeadData",
});

export default api;
