import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/v1";

export const clientURL = "http://localhost:3000";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
