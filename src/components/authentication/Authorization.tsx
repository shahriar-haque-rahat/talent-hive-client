'use client'

import { clearCookies, getServerSession, getToken } from "@/actions/auth";
import { startLoading, stopLoading } from "@/redux/loadingSlice";
import { addAuthorizedUser } from "@/redux/userSlice";
import FullScreenLoading from "@/shared/FullScreenLoading";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

interface AuthorizeInterface {
    children: ReactNode;
}

export const restrictedAfterLoginRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
]

export const publicRoutes = [
    '/',
    '/jobs',
]

const Authorization = ({ children }: AuthorizeInterface) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const isLoading = useSelector((state: any) => state.loading.isLoading);

    const handleSession = async () => {
        dispatch(startLoading());
        try {
            const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH;

            if (authEnabled === 'false') {
                dispatch(stopLoading());
                return;
            }

            let token = await getToken();

            const isRestrictRoute = restrictedAfterLoginRoutes.includes(pathname);
            const isPublicRoute = publicRoutes.includes(pathname);

            if (isPublicRoute) {
                if (token) {
                    const session = await getServerSession();
                    dispatch(addAuthorizedUser(session));
                }
                dispatch(stopLoading());
                return;
            }

            if (!token && !isRestrictRoute) {
                router.push('/login');
                return;
            }

            if (!token && isRestrictRoute) {
                dispatch(stopLoading());
                return;
            }

            if (token && isRestrictRoute) {
                router.push("/");
                return;
            }

            if (Object.keys(user)?.length > 0) {
                dispatch(stopLoading());
                return;
            }

            const session = await getServerSession();

            if (!session) {
                await clearCookies();
                dispatch(stopLoading());
                window.open("/login", "_self");
            }

            dispatch(addAuthorizedUser(session));
            dispatch(stopLoading());
        }
        catch (error) {
            await clearCookies();
            router.push("/login");
        }
    };

    useEffect(() => {
        handleSession();
    }, [pathname]);

    if (isLoading) {
        return <FullScreenLoading />;
    }

    return (
        <>
            {children}
        </>
    )
};

export default Authorization;
