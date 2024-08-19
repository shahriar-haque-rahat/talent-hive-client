'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input, Button, Select, Spacer, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const roles = [
    { key: 'user', label: 'User' },
    { key: 'employer', label: 'Employer' },
];

const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(roles[0].key);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateField = (name: string, value: string) => {
        let error = false;

        switch (name) {
            case 'fullName':
                error = !value;
                break;
            case 'userName':
                error = !value;
                break;
            case 'email':
                error = !value || !/\S+@\S+\.\S+/.test(value);
                break;
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
            fullName: formData.get('fullName'),
            userName: formData.get('userName'),
            email: formData.get('email'),
            password: formData.get('password'),
            status: 'Inactive',
            role: formData.get('role') || roles[0].key,
        };

        Object.keys(data).forEach(key => validateField(key, data[key]));
        validateField('password-retype', formData.get('password-retype') as string);

        const isValid = Object.values(errors).every(error => !error);

        if (isValid) {
            // console.log('Form Data:', data);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/register`, data);

                if (response.status === 201 || response.statusText === "Created") {
                    toast.success('Registration Successful')
                }
            }
            catch (error) {
                toast.error('Registration Error')
                // console.log("Registration error: ", error);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

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
