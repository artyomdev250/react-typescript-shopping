import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function useSignIn() {
    const { signIn: ctxSignIn } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await ctxSignIn(email, password);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to sign in. Check your credentials.";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { signIn, loading, error, setError };
}
