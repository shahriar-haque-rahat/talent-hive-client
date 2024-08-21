'use client'

import { setSession } from '@/actions/auth';
import axios from 'axios';
import React, { createContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }: AuthProviderProps) => {

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
            }
        }
        catch (error) {
            toast.error(`${error.response.data.message}` || `Failed to login`);
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
            toast.error('Account activation failed')
        }
    }

    const forgotPassword = async () => {

    }

    const resetPassword = async () => {

    }

    const logout = async () => {

    }


    const values = {
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