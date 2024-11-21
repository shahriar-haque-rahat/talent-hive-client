'use client'

import { clearCookies, getToken, setSession } from '@/actions/auth';
import { publicRoutes } from '@/actions/routes';
import { useAuth } from '@/hooks/useAxiosInstances';
import { startLoading, stopLoading } from '@/redux/loadingSlice';
import { clearUser } from '@/redux/userSlice';
import { AuthContextValues, AuthProviderProps, LoginData, RegisterData } from '@/types/auth/auth.types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext<AuthContextValues | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);

    const register = async (userData: RegisterData) => {
        try {
            const response = await useAuth.post(`/auth/register`, userData);

            if (response.status === 201 || response.statusText === "Created") {
                toast.success('Registration successful');
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success('Please check your email');
            }
        }
        catch (error: any) {
            toast.error(`${error.response.data.message}` || `Failed to register`)
        }
    }

    const login = async (userData: LoginData) => {
        try {
            const response = await useAuth.post(`/auth/login`, userData);

            if (response.data.success) {
                toast.success('Successfully logged in');
                await setSession({
                    ...response.data,
                });

                const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
                if (redirectAfterLogin) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    router.push(redirectAfterLogin);
                } else {
                    router.push('/');
                }
            }
        }
        catch (error) {
            toast.error(`Failed to login`);
        }
    }

    const activeAccount = async (token: string) => {
        try {
            const data = {
                token: token,
            }
            const response = await useAuth.put(`/auth/activate-account`, data);

            if (response.data.success) {
                await setSession({
                    ...response.data,
                });
            }
        }
        catch (error: any) {
            console.error(error.message);
            toast.error('Account activation failed', error.message)
        }
    }

    const forgotPassword = async (email: string) => {
        try {
            const response = await useAuth.post(`/auth/forgot-password`, {
                email,
            });

            if (response.data.success) {
                toast.success('A link has been sent to your email');
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Forgot password failed')
        }
    }

    const resetPassword = async (token: string | null, newPassword: string) => {
        try {
            const response = await useAuth.post(`/auth/reset-password`, {
                token,
                newPassword,
            });

            if (response.data.success) {
                toast.success('Password successfully changed');
                router.push('/login');
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Password reset failed')
        }
    }

    const logout = async () => {
        try {
            dispatch(startLoading());

            router.push('/login');

            const currentRoute = window.location.pathname;
            const isPublicRoute = publicRoutes.includes(currentRoute);

            if (!isPublicRoute) {
                sessionStorage.setItem('redirectAfterLogin', currentRoute);
            } else {
                sessionStorage.removeItem('redirectAfterLogin');
            }

            const token = await getToken();

            const response = await useAuth.post(`/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                await clearCookies();
                dispatch(clearUser());
                toast.success('User logged out');

                router.push('/login');
                dispatch(stopLoading());
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Failed to log out');
        }
    }


    const values: AuthContextValues = {
        user,
        register,
        login,
        activeAccount,
        forgotPassword,
        resetPassword,
        logout,
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
