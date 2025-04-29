/* eslint-disable no-param-reassign */
import axios from "axios";

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}v2`;
export const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
