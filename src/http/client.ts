import axios from "axios";
import { useAuthenticationStore } from "@/store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refresh = async () => {
  await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orignalRequest = error.config;

    if (error.response?.status === 401 && !orignalRequest._isRetry) {
      try {
        orignalRequest._isRetry = true;
        const headers = { ...orignalRequest.headers };
        await refresh();
        return api.request({ ...orignalRequest, headers });
      } catch (error) {
        useAuthenticationStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
