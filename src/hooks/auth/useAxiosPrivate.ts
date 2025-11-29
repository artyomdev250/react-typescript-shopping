import { useEffect } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const useAxiosPrivate = () => {
    const { accessToken, refresh } = useAuth();

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    if (config.headers && typeof config.headers.set === "function") {
                        config.headers.set("Authorization", `Bearer ${accessToken}`);
                    } else {
                        (config.headers as any) = {
                            ...(config.headers || {}),
                            Authorization: `Bearer ${accessToken}`,
                        };
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (
                    error?.response?.status === 401 &&
                    !prevRequest?._retry // custom flag to avoid infinite loop
                ) {
                    prevRequest._retry = true;
                    const newToken = await refresh();
                    if (newToken) {
                        prevRequest.headers = {
                            ...prevRequest.headers,
                            Authorization: `Bearer ${newToken}`,
                        };
                        return api(prevRequest);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refresh]);

    return api;
};

export default useAxiosPrivate;
