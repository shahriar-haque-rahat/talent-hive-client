'use client';

import React, { useContext, useState } from 'react';
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler, InputChangeEventHandler, RegisterData } from '@/types/auth/auth.types';
import { handleFormSubmit, handleInputChange } from '@/actions/formSubmitAndValidation';
import Link from 'next/link';

interface RegisterDataIncludeID extends RegisterData {
    id: string;
}

const roles = [
    { key: 'user', label: 'User' },
    { key: 'employer', label: 'Employer' },
];

const Register = () => {
    const { register } = useContext(AuthContext) as AuthContextValues;
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(roles[0].key);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleSubmit: FormEventHandler = (event) => {
        handleFormSubmit<RegisterDataIncludeID>(
            event,
            async (data) => {
                setButtonLoading(true);
                try {
                    await register(data);
                } finally {
                    setButtonLoading(false);
                }
            },
            { status: 'inactive', role },
            setErrors
        );
    }

    const handleChange: InputChangeEventHandler = (event) =>
        handleInputChange(event, setErrors, setPassword, password);

    return (
        <>
            <div className='flex justify-center items-center px-[10%] xl:px-[20%] h-[calc(100vh-80px)]'>
                <div className='flex flex-col-reverse md:flex-row w-full max-w-4xl mx-auto shadow border rounded-lg'>
                    <div className='w-full md:w-1/2 p-6 bg-white flex flex-col justify-center rounded-b-lg md:rounded-l-lg'>
                        <form onSubmit={handleSubmit}>
                            <h1 className=' text-2xl font-semibold my-3'>Register</h1>

                            <Input
                                className=' mb-2'
                                type="text"
                                name="fullName"
                                label="Full Name"
                                variant='underlined'
                                isInvalid={errors.fullName}
                                errorMessage={errors.fullName ? "Please enter your full name" : ""}
                                isRequired
                                onChange={handleChange}
                            />

                            <Input
                                className=' mb-2'
                                type="text"
                                name="userName"
                                label="Username"
                                variant='underlined'
                                isInvalid={errors.userName}
                                errorMessage={errors.userName ? "Please enter a username" : ""}
                                isRequired
                                onChange={handleChange}
                            />

                            <Input
                                className=' mb-2'
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
                                className=' mb-2'
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

                            <Input
                                className=' mb-2'
                                name="password-retype"
                                label="Retype Password"
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

                            {/* <Select name="role" label="Role" variant="underlined" value={role} onChange={(e) => setRole(e.target.value)} >
                                {roles.map((role) => (
                                    <SelectItem key={role.key} value={role.key}>
                                        {role.label}
                                    </SelectItem>
                                ))}
                            </Select> */}

                            <Button
                                type="submit"
                                className=' bg-sky-500 text-white rounded-lg w-full mt-6 border border-sky-500 hover:bg-white hover:text-sky-500'
                                disabled={buttonLoading}
                            >
                                {buttonLoading ? 'Registering...' : 'Register'}
                            </Button>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 bg-gradient-to-br from-sky-600 to-sky-400 text-white p-8 flex flex-col justify-center items-center rounded-t-lg md:rounded-r-lg md:rounded-l-none">
                        <h1 className=" text-2xl md:text-3xl font-semibold mb-4">Talent Hive</h1>
                        <p className="mb-6">Already have an account?</p>
                        <Link href="/login">
                            <Button className="bg-white text-sky-500 rounded-lg px-4 py-2 font-semibold border border-white hover:bg-sky-500 hover:text-white">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
