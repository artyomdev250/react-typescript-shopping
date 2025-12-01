import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import api from "../../api/axios";

export interface Item {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    brand: string;
}

export function useItems() {
    const { loading: authLoading, accessToken } = useAuth();

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !accessToken) return;

        let cancelled = false;

        const fetchItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await api.get<{ items: Item[] }>("/api/user/items", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!cancelled) {
                    setItems(res.data.items);
                }
            } catch (err: any) {
                if (!cancelled) {
                    setError(
                        err?.response?.data?.message || "Failed to load items."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchItems();

        return () => {
            cancelled = true;
        };
    }, [authLoading, accessToken]);

    return {
        items,
        loading: authLoading || loading,
        error,
    };
}
