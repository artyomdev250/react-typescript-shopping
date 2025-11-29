import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

export default function useUser() {
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const res = await axiosPrivate.get("/api/user/profile");
                if (isMounted) setUser(res.data);
            } catch (err) {
                if (isMounted) setUser(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, [axiosPrivate]);

    return { user, loading };
}
