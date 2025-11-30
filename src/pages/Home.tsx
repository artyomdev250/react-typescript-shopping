import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import api from "../api/axios";

function Home() {
    const [message, setMessage] = useState<string>("Loading dashboard...");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const res = await api.get("/api/user/dashboard");
                setMessage(res.data.message);
            } catch (err: any) {
                setMessage(
                    err?.response?.data?.message || "Failed to load dashboard."
                );
            }
        };

        loadDashboard();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Home</h1>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Home;
