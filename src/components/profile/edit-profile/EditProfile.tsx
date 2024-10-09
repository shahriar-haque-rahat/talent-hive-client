'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Textarea, Image } from '@nextui-org/react';
import { patchUser } from '@/apiFunctions/userData';
import { addAuthorizedUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';
import EditProfileAndCoverImageModal from './EditProfileAndCoverImageModal';
import { MdEditSquare } from "react-icons/md";
import { useEdgeStore } from '@/edgestore/edgestore';
import ResumeUpload from './ResumeUpload';

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const { edgestore } = useEdgeStore();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const characterLimit = 150;

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        designation: user?.designation || '',
        about: user?.about || '',
        facebookLink: user?.facebookLink || '',
        linkedInLink: user?.linkedInLink || '',
        phoneNumber: user?.phoneNumber || '',
        resumeLink: user?.resumeLink || '',
    });

    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [aboutCharCount, setAboutCharCount] = useState(formData.about.length);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleResumeFileChange = (file: File) => {
        setResumeFile(file);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const isFormChanged = Object.keys(formData).some(
            (key) => formData[key as keyof typeof formData] !== user[key as keyof typeof user]
        );

        if (!isFormChanged && !resumeFile) {
            setIsSubmitting(false);
            return;
        }

        if (validateForm()) {
            try {
                let uploadedResumeUrl = formData.resumeLink;

                if (resumeFile) {
                    if (user.resumeLink) {
                        await edgestore.userResumes.delete({
                            url: user.resumeLink,
                        });
                        console.log("Old Resume deleted successfully");
                    }

                    // Upload the new Resume
                    const uploadRes = await edgestore.userResumes.upload({
                        file: resumeFile,
                        onProgressChange: (progress) => {
                            console.log('Resume upload progress:', progress);
                        },
                    });
                    uploadedResumeUrl = uploadRes.url;
                }

                const updatedData = await patchUser(user._id, {
                    ...formData,
                    resumeLink: uploadedResumeUrl,
                });

                if (updatedData) {
                    dispatch(addAuthorizedUser(updatedData));
                    toast.success('Profile updated successfully');
                }
            }
            catch (error) {
                toast.error('Failed to update profile.');
                console.error('Profile update error:', error);
            }
            finally {
                setIsSubmitting(false);
            }
        }
        else {
            setIsSubmitting(false);
        }
    };

    // Function to handle opening and closing modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'profile' | 'cover' | null>(null);

    const openModal = (type: 'profile' | 'cover') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    return (
        <>
            <div>
                <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>Edit Profile Details</h1>

                <div className=' flex flex-col justify-center items-center text-center bg-white pb-6 rounded-lg border shadow'>
                    <div className='w-full relative'>
                        {/* Cover Image */}
                        <img
                            src={user.coverImage ? user.coverImage : "/assets/bg.jpg"}
                            className=' w-full h-60 object-cover object-center rounded-t-lg'
                        />
                        {/* Button to Change Cover Image */}
                        <button
                            type="button"
                            onClick={() => openModal('cover')}
                            className='absolute bottom-2 right-2 bg-gray-700 text-white p-1 border-2 border-white text-sm rounded-full hover:bg-gray-500'
                        >
                            <MdEditSquare size={22} />
                        </button>
                    </div>
                    <div className=' relative w-fit mx-auto -mt-24'>
                        {/* Profile Image */}
                        <img
                            src={user.profileImage ? user.profileImage : '/assets/user.png'}
                            alt={user.fullName}
                            className='border-4 border-white h-48 w-48 rounded-full object-cover object-top'
                        />
                        {/* Button to Change Profile Image */}
                        <button
                            type="button"
                            onClick={() => openModal('profile')}
                            className='absolute bottom-2 right-7 bg-gray-700 text-white p-1 border-2 border-white text-sm rounded-full hover:bg-gray-500'
                        >
                            <MdEditSquare size={22} />
                        </button>
                    </div>
                    <div className=''>
                        <p className=' text-lg font-semibold'>{user.userName}</p>
                        <p>{user.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
                    <div className='bg-white p-6 rounded-lg border shadow'>
                        <p className='text-lg font-medium'>User Details</p>
                        <div className='grid grid-cols-2 gap-10'>
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
                        <p className='text-lg font-medium'>Contact Information</p>
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
                                label="Phone Number"
                                fullWidth
                                variant='underlined'
                                name="phoneNumber"
                                type='number'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Resume Upload Component */}
                        <div className=' mt-10'>
                            <ResumeUpload onResumeFileChange={handleResumeFileChange} existingResume={user?.resumeLink} />
                        </div>
                    </div>

                    <Button type="submit" className='bg-sky-500 w-full text-white rounded-lg border border-sky-500 hover:bg-white hover:text-sky-500' isDisabled={isSubmitting} isLoading={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </div>

            {/* Modal to edit profile or cover image */}
            {isModalOpen && modalType && (
                <EditProfileAndCoverImageModal
                    userId={user._id}
                    userName={user.userName}
                    type={modalType}
                    initialMediaUrl={modalType === 'profile' ? user.profileImage : user.coverImage}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default EditProfile;
