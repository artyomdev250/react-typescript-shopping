import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

type LocationState = {
    from?: { pathname?: string };
};

const useSignIn = () => {
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const from = state?.from?.pathname || "/";

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await signIn(email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to sign in. Check your credentials.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { signIn: handleSignIn, loading, error };
};

export default useSignIn;
