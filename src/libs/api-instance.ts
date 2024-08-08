import axios from "axios";
import { BASE_API_URL } from "../config";

export const apiInstance = axios.create({
  baseURL: BASE_API_URL,
});

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.toJSON();
    return Promise.reject(error);
  },
);