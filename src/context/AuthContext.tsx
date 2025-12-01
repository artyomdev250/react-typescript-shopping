import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { api } from "../lib/api";

type AuthContextType = {
    accessToken: string | null;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem("accessToken");
    });

    // Keep localStorage in sync with accessToken
    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [accessToken]);

    // POST /api/auth/signin → { accessToken }
    const signIn = useCallback(async (email: string, password: string) => {
        const res = await api.post("/api/auth/signin", { email, password });
        const token = res.data.accessToken as string;
        if (!token) {
            throw new Error("No accessToken received from /signin");
        }
        setAccessToken(token);
    }, []);

    // POST /api/auth/signout (best-effort, then clear local state)
    const signOut = useCallback(async () => {
        try {
            if (accessToken) {
                await api.post("/api/auth/signout");
            }
        } catch {
            // ignore backend errors on signout
        } finally {
            setAccessToken(null);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated: !!accessToken,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
