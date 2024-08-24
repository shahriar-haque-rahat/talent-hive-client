'use client'

import { clearCookies, setSession } from '@/actions/auth';
import { publicRoutes } from '@/actions/routes';
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/register`, userData);

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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/login`, userData);

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
            const response = await axios.put(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/activate-account`, data);

            if (response.data.success) {
                await setSession({
                    ...response.data,
                });
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Account activation failed')
        }
    }

    const forgotPassword = async (email: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/forgot-password`, {
                email,
            });

            if (response.data.success) {
                toast.success('A link has been sent to your email');
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Forgot password failed')
        }
    }

    const resetPassword = async (token: string | null, newPassword: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/reset-password`, {
                token,
                newPassword,
            });

            if (response.data.success) {
                toast.success('Password successfully changed');
                router.push('/login');
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Password reset failed')
        }
    }

    const logout = async () => {
        try {
            const currentRoute = window.location.pathname;
            const isPublicRoute = publicRoutes.includes(currentRoute);

            if (!isPublicRoute) {
                sessionStorage.setItem('redirectAfterLogin', currentRoute);
            } else {
                sessionStorage.removeItem('redirectAfterLogin');
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`);

            if (response.data.success) {
                await clearCookies();
                dispatch(clearUser());
                toast.success('User logged out');

                if (!isPublicRoute) {
                    router.push('/login');
                }
            }
        }
        catch (error) {
            console.log(error);
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
