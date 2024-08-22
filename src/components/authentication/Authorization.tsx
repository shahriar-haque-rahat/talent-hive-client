'use client'

import { clearCookies, getServerSession, getToken } from "@/actions/auth";
import { addAuthorizedUser } from "@/redux/userSlice";
import FullScreenLoading from "@/shared/FullScreenLoading";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from 'react';
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
]

const Authorization = ({ children }: AuthorizeInterface) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const handleSession = async () => {
        try {
            const authEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH;

            if (authEnabled === 'false') {
                return setLoading(false);
            }

            let token = await getToken();

            const isRestrictRoute = restrictedAfterLoginRoutes.includes(pathname);
            const isPublicRoute = publicRoutes.includes(pathname);

            if (isPublicRoute) {
                setLoading(false);
                return;
            }
            if (!token && !isRestrictRoute) {
                router.push('/login');
                // setLoading(false);
                return;
            }
            if (!token && isRestrictRoute) {
                setLoading(false);
                return;
            }
            if (token && isRestrictRoute) {
                router.push("/");
                return;
            }

            if (Object.keys(user)?.length > 0) {
                return setLoading(false);
            }

            const session = await getServerSession();

            if (!session) {
                await clearCookies();
                setLoading(false);
                window.open("/login", "_self");
            }

            dispatch(addAuthorizedUser(session));
            setLoading(false);
        }
        catch (error) {
            await clearCookies();
            router.push("/login");
        }
    };

    useEffect(() => {
        handleSession();
    }, [pathname]);

    if (loading) {
        return <FullScreenLoading />
    }

    return (
        <>
            {children}
        </>
    )
};

export default Authorization;
