import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
