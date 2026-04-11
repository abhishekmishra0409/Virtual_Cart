import axios from "axios";
import { base_url } from "./baseURL.js";

const getStoredUser = () => {
    try {
        return localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null;
    } catch {
        return null;
    }
};

export const getAccessToken = () => {
    const storedUser = getStoredUser();
    return storedUser?.token || localStorage.getItem("userToken") || "";
};

export const isAccessTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payloadPart = token.split(".")[1];
        const normalizedPayload = payloadPart
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(payloadPart.length + ((4 - (payloadPart.length % 4)) % 4), "=");
        const payload = JSON.parse(window.atob(normalizedPayload));

        return !payload.exp || payload.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
};

export const setAccessToken = (token) => {
    localStorage.setItem("userToken", token);

    const storedUser = getStoredUser();
    if (storedUser) {
        localStorage.setItem("user", JSON.stringify({ ...storedUser, token }));
    }
};

export const clearAuthStorage = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("checkoutTotal");
};

const apiClient = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

const refreshClient = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

let refreshPromise = null;

export const refreshAccessToken = async () => {
    if (!refreshPromise) {
        refreshPromise = refreshClient
            .get("user/refresh")
            .then((response) => response.data.accessToken)
            .finally(() => {
                refreshPromise = null;
            });
    }

    const accessToken = await refreshPromise;
    setAccessToken(accessToken);
    return accessToken;
};

export const ensureAuthSession = async () => {
    const token = getAccessToken();

    if (!token) {
        clearAuthStorage();
        return false;
    }

    if (!isAccessTokenExpired(token)) {
        return true;
    }

    try {
        await refreshAccessToken();
        return true;
    } catch {
        clearAuthStorage();
        return false;
    }
};

apiClient.interceptors.request.use((requestConfig) => {
    const token = getAccessToken();

    if (token && !requestConfig._skipAuthHeader) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
    } else {
        delete requestConfig.headers.Authorization;
    }

    return requestConfig;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            !originalRequest ||
            originalRequest._retry ||
            originalRequest._skipAuthRefresh ||
            error.response?.status !== 401
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const accessToken = await refreshAccessToken();
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            clearAuthStorage();

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }

            return Promise.reject(refreshError);
        }
    }
);

export default apiClient;
