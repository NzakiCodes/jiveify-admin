import axios from "axios";
import { baseURL } from "./constants";
import { useAuthStore } from "@/store";

const token = useAuthStore.getState().token
const axiosAuthInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
});

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export { axiosAuthInstance as axiosAuth, axiosInstance as axios };