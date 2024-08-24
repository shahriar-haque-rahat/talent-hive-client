import { ReactNode, FormEvent, ChangeEvent } from 'react';

export interface RegisterData {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    status?: string;
    role?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    password: string;
}

export interface TokenData {
    token: string;
}

export interface AuthContextValues {
    user: any;
    register: (registerData: RegisterData) => Promise<void>;
    login: (loginData: LoginData) => Promise<void>;
    activeAccount: (token: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string | null, newPassword: string) => Promise<void>;
    logout: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export type FormEventHandler = (event: FormEvent<HTMLFormElement>) => void;
export type InputChangeEventHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
