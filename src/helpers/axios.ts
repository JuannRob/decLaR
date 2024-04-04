import axios from "axios";
import { config } from "../config/config";

const customFetch = axios.create({
  baseURL: `${config.api.url}/users`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

customFetch.interceptors.request.use(
  async (config) => {
    const token = localStorage;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      const access_token = resp.response.accessToken;
      localStorage.setItem("accessToken", access_token);
      customFetch.defaults.headers.common["Authorization"] =
        `Bearer ${access_token}`;
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  try {
    const resp = await customFetch.get("auth/refresh");
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};
