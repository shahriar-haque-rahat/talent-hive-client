'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Textarea } from '@nextui-org/react';
import { patchUser } from '@/apiFunctions/userData';
import { addAuthorizedUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const characterLimit = 150;

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        userName: user?.userName || '',
        email: user?.email || '',
        about: user?.about || '',
        facebookLink: user?.facebookLink || '',
        linkedInLink: user?.linkedInLink || '',
        cvLink: user?.cvLink || '',
        designation: user?.designation || '',
    });

    const [aboutCharCount, setAboutCharCount] = useState(formData.about.length);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'about') {
            const charCount = value.length;

            if (charCount <= characterLimit) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
                setAboutCharCount(charCount);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.userName.trim()) {
            newErrors.userName = 'Username is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isFormChanged = Object.keys(formData).some(
            (key) => formData[key as keyof typeof formData] !== user[key as keyof typeof user]
        );

        if (!isFormChanged) {
            return;
        }

        if (validateForm()) {
            const updatedData = await patchUser(user._id, formData);
            if (updatedData) {
                dispatch(addAuthorizedUser(updatedData));
                toast.success('Profile updated');
            }
        }
    };

    return (
        <div>
            <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow'>Edit Profile Details</h1>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='bg-white p-6 rounded-lg border shadow'>
                    <p className='text-lg font-medium'>User Details</p>
                    <div className='grid grid-cols-2 gap-10'>
                        <Input
                            label="Username"
                            fullWidth
                            variant='underlined'
                            name="userName"
                            isDisabled
                            value={formData.userName}
                        />

                        <Input
                            label="Email"
                            fullWidth
                            variant='underlined'
                            name="email"
                            isDisabled
                            value={formData.email}
                        />

                        <Input
                            label="Full Name"
                            fullWidth
                            variant='underlined'
                            name="fullName"
                            isInvalid={!!errors.fullName}
                            errorMessage={errors.fullName}
                            isRequired
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Designation"
                            fullWidth
                            variant='underlined'
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                        />

                        <div className="col-span-2">
                            <Textarea
                                label="About"
                                fullWidth
                                variant='underlined'
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                            />
                            {/* Character count display */}
                            <div className="text-right text-sm text-gray-500">
                                {aboutCharCount}/{characterLimit} characters
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-lg border shadow'>
                    <p className='text-lg font-medium'>Social Links</p>
                    <div className='grid grid-cols-2 gap-10'>
                        <Input
                            label="Facebook Link"
                            fullWidth
                            variant='underlined'
                            name="facebookLink"
                            value={formData.facebookLink}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="LinkedIn Link"
                            fullWidth
                            variant='underlined'
                            name="linkedInLink"
                            value={formData.linkedInLink}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="CV Link"
                            fullWidth
                            variant='underlined'
                            name="cvLink"
                            value={formData.cvLink}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <Button type='submit' className='bg-sky-500 w-full text-white rounded-lg'>Save Changes</Button>
            </form>
        </div>
    );
};

export default EditProfile;
