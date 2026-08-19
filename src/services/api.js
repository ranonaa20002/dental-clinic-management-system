import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isAuthRequest =
      config.url?.includes("/auth/local") ||
      config.url?.includes("/auth/local/register");

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;