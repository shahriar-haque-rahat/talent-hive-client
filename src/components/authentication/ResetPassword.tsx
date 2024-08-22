'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { Button, Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// TODO: type gula alada interface banay rakhte hbe
const ResetPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateField = (name, value) => {
        let error = false;

        switch (name) {
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                error = !passwordRegex.test(value);
                setPassword(value);
                break;
            case 'password-retype':
                error = value !== password;
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
            password: formData.get('password'),
        };

        Object.keys(data).forEach(key => validateField(key, data[key]));
        validateField('password-retype', formData.get('password-retype'));

        const isValid = Object.values(errors).every(error => !error);

        if (isValid) {
            await resetPassword(token, data.password);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
    };
    return (
        <>
            <div className=' flex flex-col justify-center items-center min-h-screen'>
                <div className='w-full max-w-xl p-6 bg-white shadow-md rounded'>
                    <form onSubmit={handleSubmit}>
                        <h1 className=' text-2xl font-semibold my-3'>Reset Password</h1>
                        <Input
                            name="password"
                            label="New Password"
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

                        <Input
                            name="password-retype"
                            label="Retype New Password"
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
                            isInvalid={errors['password-retype']}
                            errorMessage={errors['password-retype'] ? "Passwords do not match" : ""}
                            isRequired
                            onChange={handleChange}
                        />

                        <Button type="submit" className=' bg-blue-500 text-white rounded w-full mt-6'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;