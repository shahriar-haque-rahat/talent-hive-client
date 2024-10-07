'use client'

import React, { useContext, useState } from 'react';
import { handleFormSubmit, handleInputChange } from '@/actions/formSubmitAndValidation';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler, InputChangeEventHandler } from '@/types/auth/auth.types';
import { Button, Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const { resetPassword } = useContext(AuthContext) as AuthContextValues;
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit: FormEventHandler = (event) =>
        handleFormSubmit(
            event,
            async (data) => { await resetPassword(token, data.password); },
            { password: '' },
            setErrors
        );

    const handleChange: InputChangeEventHandler = (event) =>
        handleInputChange(event, setErrors, setPassword, password);

    return (
        <>
            <div className=' flex flex-col justify-center items-center  h-[calc(100vh-80px)]'>
                <div className='w-full max-w-xl p-6 bg-white shadow border rounded-lg'>
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

                        <Button type="submit" className=' bg-sky-500 text-white rounded-lg w-full mt-6 border border-sky-500 hover:bg-white hover:text-sky-500'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
