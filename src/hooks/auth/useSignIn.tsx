import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function useSignIn() {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, password: string) => {
        setError(null);
        setLoading(true);

        try {
            await signin(email, password);
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to sign in. Check your credentials."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { signIn, loading, error };
}
