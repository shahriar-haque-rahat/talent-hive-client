import axios, { AxiosInstance } from 'axios';
import { getToken, setSession, clearCookies } from '@/actions/auth';
import store from '@/redux/store';
import { clearUser } from '@/redux/userSlice';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const setupInterceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    );

                    const newToken = response.data.accessToken;
                    await setSession({ accessToken: newToken });
                    processQueue(null, newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    await clearCookies();
                    store.dispatch(clearUser());
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default setupInterceptors;
