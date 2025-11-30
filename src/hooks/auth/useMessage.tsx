import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export function useDashboardMessage() {
    const { loading: authLoading, accessToken } = useAuth();

    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !accessToken) return;

        let cancelled = false;

        const fetchMessage = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await api.get("/api/user/dashboard", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!cancelled) {
                    setMessage(res.data.message);
                }
            } catch (err: any) {
                if (!cancelled) {
                    setError(
                        err?.response?.data?.message || "Failed to load dashboard."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchMessage();

        return () => {
            cancelled = true;
        };
    }, [authLoading, accessToken]);

    const isLoading = authLoading || loading;

    return { message, loading: isLoading, error };
}
