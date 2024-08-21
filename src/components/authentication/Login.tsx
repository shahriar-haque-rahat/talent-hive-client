'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { Button, Input } from '@nextui-org/react';
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

    const validateField = (name: string, value: string) => {
        let error = false;

        switch (name) {
            case 'email':
                error = !value || !/\S+@\S+\.\S+/.test(value);
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                error = !passwordRegex.test(value);
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        Object.keys(data).forEach(key => validateField(key, data[key]));

        const isValid = Object.values(errors).every(error => !error);

        if (isValid) {
            await login(data);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 bg-white shadow-md rounded">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />

                    <Button type="submit" className=' bg-blue-500 text-white rounded w-full mt-6'>Login</Button>
                </form>
            </div>
        </>
    );
};

export default Login;