'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { Button, Input, Link } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Login = () => {
    const router = useRouter();
    const { login, activeAccount } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState({});

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        await login(data);
    }

    return (
        <>
            <div className=' flex flex-col justify-center items-center min-h-screen'>
                <div className='w-full max-w-xl p-6 bg-white shadow-md rounded'>
                    <form onSubmit={handleSubmit}>
                        <h1 className=' text-2xl font-semibold my-3'>Login</h1>

                        <Input
                            className=' mb-4'
                            type="email"
                            name="email"
                            label="Email"
                            variant='underlined'
                            isInvalid={errors.email}
                            errorMessage={errors.email ? "Please enter a valid email" : ""}
                            isRequired
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
                            isInvalid={errors.password}
                            errorMessage={errors.password ? "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character." : ""}
                            isRequired
                        />

                        <Button type="submit" className=' bg-blue-500 text-white rounded w-full mt-6'>Login</Button>
                    </form>
                    <Link href='/forgot-password' className=' cursor-pointer mt-4 text-blue-500 font-semibold'>Forgot Password</Link>
                </div>
            </div>
        </>
    );
};

export default Login;