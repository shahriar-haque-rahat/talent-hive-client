import axios from 'axios';
import setupInterceptors from '@/utils/axiosInterceptor';

const useAuth = setupInterceptors(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
        withCredentials: true,
    })
);

const useServer = setupInterceptors(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        withCredentials: true,
    })
);

const useChat = setupInterceptors(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_CHAT_URL,
        withCredentials: true,
    })
);

export { useAuth, useServer, useChat };
