'use client'

import React, { useContext, useState } from 'react';
import { handleFormSubmit, handleInputChange } from '@/actions/formSubmitAndValidation';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler, InputChangeEventHandler } from '@/types/auth/auth.types';
import { Button, Input } from '@nextui-org/react';

const ForgotPassword = () => {
    const { forgotPassword } = useContext(AuthContext) as AuthContextValues;
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleSubmit: FormEventHandler = (event) =>

        handleFormSubmit(
            event,
            async (data) => {
                setButtonLoading(true);
                try {
                    await forgotPassword(data.email);
                } finally {
                    setButtonLoading(false);
                }
            },
            { email: '' },
            setErrors
        );

    const handleChange: InputChangeEventHandler = (event) =>
        handleInputChange(event, setErrors, () => { }, '');

    return (
        <>
            <div className=' flex flex-col justify-center items-center h-[calc(100vh-80px)]'>
                <div className='w-full max-w-xl p-6 bg-white shadow border rounded-lg'>
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

                        <Button
                            type="submit"
                            className=' bg-sky-500 text-white rounded-lg w-full mt-6 border border-sky-500 hover:bg-white hover:text-sky-500'
                            disabled={buttonLoading}
                        >
                            {buttonLoading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
