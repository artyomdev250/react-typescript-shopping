import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function useSignOut() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const signOut = async () => {
        setLoading(true);
        try {
            await signout();
        } finally {
            setLoading(false);
            navigate("/signin", { replace: true });
        }
    };

    return { signOut, loading };
}
