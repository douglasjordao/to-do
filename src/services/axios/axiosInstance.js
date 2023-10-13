import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/`,
});

export { axiosInstance };
