import axios, {
    AxiosHeaders,
    type InternalAxiosRequestConfig,
    type AxiosError,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_HOST;

// Main client used everywhere in the app
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Separate client just for /refresh to avoid interceptor recursion
const refreshClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// --- Request interceptor: attach Authorization if we have a token ---
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            // Ensure headers is an AxiosHeaders instance
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }

            // This is fully type-safe with Axios v1
            (config.headers as AxiosHeaders).set(
                "Authorization",
                `Bearer ${token}`
            );
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// --- Helper to call /refresh and store the new token ---
const refreshToken = async (): Promise<string> => {
    const res = await refreshClient.post("/api/auth/refresh");
    const token = res.data.accessToken as string;
    if (!token) {
        throw new Error("No accessToken received from /refresh");
    }
    localStorage.setItem("accessToken", token);
    return token;
};

// --- Response interceptor: on 401, try refresh once, then logout ---
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (!error.response || error.response.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const newToken = await refreshToken();

            if (!originalRequest.headers) {
                originalRequest.headers = new AxiosHeaders();
            }
            (originalRequest.headers as AxiosHeaders).set(
                "Authorization",
                `Bearer ${newToken}`
            );

            return api(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem("accessToken");
            if (window.location.pathname !== "/signin") {
                window.location.href = "/signin";
            }
            return Promise.reject(refreshError);
        }
    }
);
