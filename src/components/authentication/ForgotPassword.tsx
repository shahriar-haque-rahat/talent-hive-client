'use client'

import React, { useContext, useState } from 'react';
import { handleFormSubmit, handleInputChange } from '@/actions/formSubmitAndValidation';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler, InputChangeEventHandler } from '@/types/auth/auth.types';
import { Button, Input } from '@nextui-org/react';

const ForgotPassword = () => {
    const { forgotPassword } = useContext(AuthContext) as AuthContextValues;
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleSubmit: FormEventHandler = (event) =>

        handleFormSubmit(
            event,
            async (data) => { await forgotPassword(data.email); },
            { email: '' },
            setErrors
        );

    const handleChange: InputChangeEventHandler = (event) =>
        handleInputChange(event, setErrors, () => { }, '');

    return (
        <>
            <div className=' flex flex-col justify-center items-center min-h-screen'>
                <div className='w-full max-w-xl p-6 bg-white shadow-md rounded'>
                    <form onSubmit={handleSubmit}>
                        <h1 className=' text-2xl font-semibold my-3'>Forgot Password</h1>

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

                        <Button type="submit" className=' bg-blue-500 text-white rounded w-full mt-6'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
