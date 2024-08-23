'use client';

import React, { useContext, useState } from 'react';
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues, FormEventHandler, InputChangeEventHandler, RegisterData } from '@/types/auth/auth.types';
import { generateRandomDigits } from '@/actions/uid';
import { handleFormSubmit, handleInputChange } from '@/actions/formSubmitAndValidation';

interface RegisterDataIncludeUID extends RegisterData {
    uid: string;
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

    const handleSubmit: FormEventHandler = (event) =>
        handleFormSubmit<RegisterDataIncludeUID>(
            event,
            async (data) => { await register(data); },
            { uid: `u${generateRandomDigits()}`, status: 'inactive', role },
            setErrors
        );

    const handleChange: InputChangeEventHandler = (event) =>
        handleInputChange(event, setErrors, setPassword, password);

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 bg-white shadow-md rounded">
                    <h1 className=' text-2xl font-semibold my-3'>Register</h1>

                    <div className=' flex flex-col md:flex-row gap-4 mb-4'>
                        <Input
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
                            type="text"
                            name="userName"
                            label="Username"
                            variant='underlined'
                            isInvalid={errors.userName}
                            errorMessage={errors.userName ? "Please enter a username" : ""}
                            isRequired
                            onChange={handleChange}
                        />
                    </div>

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

                    <div className=' flex flex-col md:flex-row gap-4 mb-4'>
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

                        <Input
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
                    </div>

                    <Select name="role" label="Role" variant="underlined" value={role} onChange={(e) => setRole(e.target.value)} >
                        {roles.map((role) => (
                            <SelectItem key={role.key} value={role.key}>
                                {role.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Button type="submit" className=' bg-blue-500 text-white rounded w-full mt-6'>Register</Button>
                </form>
            </div>
        </>
    );
};

export default Register;
