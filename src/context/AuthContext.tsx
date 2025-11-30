import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import api from "../api/axios";

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    signin: (email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Try to restore session on load via /api/auth/refresh
    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.post("/api/auth/refresh");
                setAccessToken(res.data.accessToken);
            } catch {
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Attach token + refresh interceptor
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest: any = error.config;

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    try {
                        const res = await api.post("/api/auth/refresh");
                        const newToken = res.data.accessToken;
                        setAccessToken(newToken);

                        originalRequest.headers = originalRequest.headers ?? {};
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;

                        return api(originalRequest);
                    } catch (refreshError) {
                        setAccessToken(null);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken]);

    const signin = async (email: string, password: string) => {
        const res = await api.post("/api/auth/signin", { email, password });
        setAccessToken(res.data.accessToken);
    };

    const signout = async () => {
        try {
            await api.post("/api/auth/signout");
        } catch {
            // ignore network errors on logout
        } finally {
            setAccessToken(null);
        }
    };

    const value: AuthContextType = {
        accessToken,
        isAuthenticated: !!accessToken,
        loading,
        signin,
        signout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
