import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export function useDashboardMessage() {
    const { loading: authLoading, accessToken } = useAuth();

    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const didFetch = useRef(false);

    useEffect(() => {
        if (authLoading || !accessToken) return;
        if (didFetch.current) return;
        didFetch.current = true;

        const fetchMessage = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/user/dashboard", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setMessage(res.data.message);
            } catch (err) {
                setError("Failed to load dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessage();
    }, [authLoading, accessToken]);

    const isLoading = authLoading || loading;

    return { message, loading: isLoading, error };
}
