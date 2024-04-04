const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL;

const API = {
  url: API_URL,
};
export const config = {
  api: API,
};
