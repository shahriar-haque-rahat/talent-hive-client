'use client'

import { clearCookies, getServerSession, getToken } from "@/actions/auth";
import { publicRoutes, restrictedAfterLoginRoutes } from "@/actions/routes";
import { startLoading, stopLoading } from "@/redux/loadingSlice";
import { addAuthorizedUser } from "@/redux/userSlice";
import FullScreenLoading from "@/shared/FullScreenLoading";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

interface AuthorizeInterface {
    children: ReactNode;
}

const Authorization = ({ children }: AuthorizeInterface) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const isLoading = useSelector((state: any) => state.loading.isLoading);
    console.log('user:', user);

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
            const isPrivateRoute = !isRestrictRoute && !isPublicRoute;

            if (isPublicRoute) {
                if (token) {
                    const session = await getServerSession();
                    if (session) {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${session.id}`);
                        dispatch(addAuthorizedUser(response.data));
                    }
                }
                dispatch(stopLoading());
                return;
            }

            if (!token && isPrivateRoute) {
                sessionStorage.setItem('redirectAfterLogin', pathname);
                router.push('/login');
                return;
            }

            // if (!token && !isRestrictRoute) {
            //     router.push('/login');
            //     return;
            // }

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

            if (session) {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${session.id}`);
                dispatch(addAuthorizedUser(response.data));
            }

            dispatch(stopLoading());
        }
        catch (error) {
            await clearCookies();
            router.push("/login");
        }
    };

    useEffect(() => {
        if (!Object.keys(user)?.length) {
            handleSession();
        }
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
