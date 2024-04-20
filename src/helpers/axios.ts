import axios, { AxiosResponse } from "axios";
import { config } from "../config/config";

const BASE_URL = `${config.api.url}/user`;

const customFetch = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

customFetch.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("Hay access token");
      config.headers["authorization"] = `Bearer ${token}`;
    } else {
      console.log("No hay access token");
    }
    return config;
  },
  (error) => {
    console.log("Error desde request");

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

      console.log("Comenzando actualización de token");

      const res = await refreshToken();

      const access_token = res?.headers["authorization"];
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
    const res: AxiosResponse = await customFetch.get("/refresh");
    console.log("Res refresh token", res);
    return res;
  } catch (e) {
    console.log("Error", e);
  }
};

export const getUsers = async () => {
  try {
    const res: AxiosResponse = await customFetch.get("/");
    console.log("RES getUsers: ", res);
  } catch (err) {
    console.log(err);
  }
};
