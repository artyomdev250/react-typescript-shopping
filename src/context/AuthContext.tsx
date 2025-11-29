import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useCallback,
} from "react";
import api from "../api/axios";

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const signIn = useCallback(async (email: string, password: string) => {
        const res = await api.post("/api/auth/signin", { email, password });
        // adjust if your API uses a different field name
        const token: string | undefined =
            res.data?.accessToken ?? res.data?.token ?? res.data?.access_token;

        if (!token) {
            throw new Error("No accessToken returned from server");
        }

        setAccessToken(token);
    }, []);

    const signOut = useCallback(async () => {
        try {
            await api.post("/api/auth/signout");
        } catch {
            // don't block UI if backend signout fails
        } finally {
            setAccessToken(null);
        }
    }, []);

    const refresh = useCallback(async () => {
        try {
            const res = await api.post("/api/auth/refresh");
            const token: string | undefined =
                res.data?.accessToken ?? res.data?.token ?? res.data?.access_token;

            if (!token) {
                setAccessToken(null);
                return null;
            }

            setAccessToken(token);
            return token;
        } catch {
            setAccessToken(null);
            return null;
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ accessToken, setAccessToken, signIn, signOut, refresh }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
