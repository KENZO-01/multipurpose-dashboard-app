// src/api/axiosInstance.ts
import { setAccessToken } from "@/Store/user/user-reducer";
import store from "@/Store/store";
import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "http://localhost:5000/api"
});

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // change this to your API base
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: any = store.getState();
    const accessToken = state?.user?.tokens?.access;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor for refresh token
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;
      try {
        const state: any = store.getState();
        const refreshToken = state?.user?.tokens?.refresh;

        const response = await axios.post("http://localhost:5000/api/auth/refresh", {
          refreshToken,
        });

        if (response?.data?.accessToken) {
          store.dispatch(setAccessToken(response?.data?.accessToken));
        }
        originalRequest.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr: any) {
        localStorage.setItem("persist:root", "");
        localStorage.setItem("persist:user", "");
        console.error("Refresh token expired", refreshErr);
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    else if (error.response?.status === 403){
      localStorage.setItem("persist:root", "");
      localStorage.setItem("persist:user", "");
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
