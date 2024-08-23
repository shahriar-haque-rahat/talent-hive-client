import { ChangeEvent, FormEvent } from "react";

export type ValidationErrors = Record<string, boolean>;

export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
};

export const validateField = (name: string, value: string, password: string = ''): boolean => {
    let error = false;

    switch (name) {
        case 'fullName':
        case 'userName':
            error = !value.trim();
            break;
        case 'email':
            error = !value.trim() || !/\S+@\S+\.\S+/.test(value);
            break;
        case 'password':
            error = !isValidPassword(value);
            break;
        case 'password-retype':
            error = value !== password;
            break;
        default:
            break;
    }

    return error;
};

export const validateForm = (data: Record<string, string>, password: string = ''): ValidationErrors => {
    const errors: ValidationErrors = {};

    Object.keys(data).forEach((key) => {
        const currentPassword = key === 'password-retype' ? data['password'] : password;
        errors[key] = validateField(key, data[key], currentPassword);
    });

    return errors;
};

export const isFormValid = (errors: ValidationErrors): boolean => {
    return Object.values(errors).every((error) => !error);
};

export const handleFormSubmit = async <T extends Record<string, any>>(
    event: FormEvent<HTMLFormElement>,
    submitHandler: (data: T) => Promise<void>,
    extraData: Partial<T>,
    setErrors: (errors: ValidationErrors) => void
) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data: Partial<T> = { ...extraData };

    formData.forEach((value, key) => {
        data[key as keyof T] = value as any;
    });

    const newErrors = validateForm(data as T, data.password);
    setErrors(newErrors);

    if (isFormValid(newErrors)) {
        await submitHandler(data as T);
    }
};

export const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setErrors: (errors: ValidationErrors) => void,
    setPassword: (password: string) => void,
    password: string
) => {
    const { name, value } = event.target;
    const passwordValue = name === 'password' ? value : password;

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value, passwordValue),
    }));

    if (name === 'password') {
        setPassword(value);
    }
};
