'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler } from '@/types/auth/auth.types';
import { Button, Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const { login, activeAccount } = useContext(AuthContext) as AuthContextValues;
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (token) {
            activeAccount(token)
                .then(() => {
                    router.push("/");
                })
                .catch((err: any) => {
                    router.push("/login");
                });
        }
    }, [token]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        await login(data);
    }

    return (
        <>
            <div className='flex justify-center items-center px-[10%] xl:px-[20%] h-[calc(100vh-80px)]'>
                <div className='flex flex-col-reverse md:flex-row w-full max-w-4xl mx-auto shadow-md'>
                    <div className='w-full md:w-1/2 p-6 bg-white flex flex-col justify-center'>
                        <form onSubmit={handleSubmit}>
                            <h1 className=' text-2xl font-semibold my-3'>Login</h1>

                            <Input
                                className=' mb-4'
                                type="email"
                                name="email"
                                label="Email"
                                variant='underlined'
                            />

                            <Input
                                name="password"
                                label="Password"
                                variant='underlined'
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />

                            <Button type="submit" className=' bg-sky-500 text-white rounded-none w-full mt-6 border border-sky-500 hover:bg-white hover:text-sky-500'>Login</Button>
                        </form>
                        <Link href='/forgot-password' className=' cursor-pointer mt-4 text-sky-500 font-semibold hover:text-sky-600'>Forgot Password</Link>
                    </div>

                    <div className="w-full md:w-1/2 bg-gradient-to-br from-sky-600 to-sky-400 text-white p-8 flex flex-col justify-center items-center">
                        <h1 className=" text-2xl md:text-3xl font-semibold mb-4">Welcome Back</h1>
                        <p className="mb-6">Don't have an account?</p>
                        <Link href="/register">
                            <Button className="bg-white text-sky-500 rounded-none px-4 py-2 font-semibold border border-white hover:bg-sky-500 hover:text-white">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
