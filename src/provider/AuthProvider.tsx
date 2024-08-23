'use client'

import { clearCookies, getServerSession, setSession } from '@/actions/auth';
import { addAuthorizedUser } from '@/redux/userSlice';
import { AuthContextValues, AuthProviderProps, ForgotPasswordData, LoginData, RegisterData, ResetPasswordData, TokenData } from '@/types/auth/auth.types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext<AuthContextValues | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
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
                router.push('/');
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
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Password reset failed')
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`);

            if (response.data.success) {
                await clearCookies();
                toast.success('User logged out');
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Failed to log out')
        }
    }

    const values: AuthContextValues = {
        user,
        loading,
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
