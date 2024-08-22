'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { Button, Input } from '@nextui-org/react';
import React, { useContext, useState } from 'react';

const ForgotPassword = () => {
    const { forgotPassword } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const validateField = (name: string, value: string) => {
        let error = false;

        switch (name) {
            case 'email':
                error = !value || !/\S+@\S+\.\S+/.test(value);
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
        };

        Object.keys(data).forEach(key => validateField(key, data[key]));

        const isValid = Object.values(errors).every(error => !error);

        if (isValid) {
            await forgotPassword(data.email);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

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