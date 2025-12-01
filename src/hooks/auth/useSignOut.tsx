import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function useSignOut() {
    const { signOut: ctxSignOut } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signOut = async () => {
        setLoading(true);
        setError(null);

        try {
            await ctxSignOut();
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to sign out.";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { signOut, loading, error };
}
