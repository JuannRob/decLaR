import axios, { AxiosResponse } from "axios";
import { config } from "../config/config";

const BASE_URL = `${config.api.url}/user`;

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();

        const newAccessToken = res?.headers["authorization"];
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.log("Refresh token failed: ", error);
        localStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  try {
    const res: AxiosResponse = await axiosConfig.get("/refresh");
    return res;
  } catch (e) {
    console.log("Error: ", e);
    throw e;
  }
};

export const getUser = async () => {
  try {
    const res: AxiosResponse = await axiosConfig.get("/get");
    return res.data.user;
  } catch (e) {
    console.log("Error: ", e);
    throw e;
  }
};
