'use client'

import { clearCookies, setSession } from '@/actions/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const register = async (userData) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/register`, userData);

            if (response.status === 201 || response.statusText === "Created") {
                toast.success('Registration successful');
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success('Please check your email');
            }
        }
        catch (error) {
            toast.error(`${error.response.data.message}` || `Failed to register`)
        }
    }

    const login = async (userData) => {
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

    const activeAccount = async (token) => {
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

    const forgotPassword = async (email) => {
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

    const resetPassword = async (token, newPassword) => {
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

    const values = {
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