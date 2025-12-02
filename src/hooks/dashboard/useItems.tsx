import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

export type Item = {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    brand: string;
};

export type ItemsResponse = {
    items: Item[];
};

export function useItems() {
    const [data, setData] = useState<ItemsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get<ItemsResponse>("/api/user/items");
            setData(res.data);
        } catch (error: unknown) {
            const err = error as any;
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load items.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { data, loading, error, refetch: fetchItems };
}
