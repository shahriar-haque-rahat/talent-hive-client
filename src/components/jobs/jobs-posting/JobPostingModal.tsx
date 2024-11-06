'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react';
import { MdClose, MdAdd, MdRemove } from 'react-icons/md';
import { createJobPost, updateJobPost } from '@/apiFunctions/jobpostData';
import { addJobPost, editPost } from '@/redux/jobPostSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/shared/ConfirmationModal';

const JobPostingModal = ({ isOpen, onClose, companyId, jobPost, handleAddJobPost }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        companyId,
        jobTitle: '',
        position: '',
        workplaceType: '',
        jobLocation: '',
        jobType: '',
        about: {
            description: '',
            educationalRequirements: [''],
            experienceRequirements: [''],
            additionalRequirements: [''],
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const resetForm = () => {
        setFormData({
            companyId,
            jobTitle: '',
            position: '',
            workplaceType: '',
            jobLocation: '',
            jobType: '',
            about: {
                description: '',
                educationalRequirements: [''],
                experienceRequirements: [''],
                additionalRequirements: [''],
            },
        });
        // onClose();
    }

    useEffect(() => {
        if (jobPost && isOpen) {
            setFormData({
                companyId: companyId,
                jobTitle: jobPost.jobTitle,
                position: jobPost.position,
                workplaceType: jobPost.workplaceType,
                jobLocation: jobPost.jobLocation,
                jobType: jobPost.jobType,
                about: {
                    description: jobPost.about.description,
                    educationalRequirements: jobPost.about.educationalRequirements || [''],
                    experienceRequirements: jobPost.about.experienceRequirements || [''],
                    additionalRequirements: jobPost.about.additionalRequirements || [''],
                },
            });
        } else {
            resetForm();
        }
    }, [isOpen, jobPost]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAboutChange = (field, value) => {
        setFormData({
            ...formData,
            about: { ...formData.about, [field]: value },
        });
    };

    const handleArrayChange = (field, index, value) => {
        const updatedArray = [...formData.about[field]];
        updatedArray[index] = value;
        setFormData({
            ...formData,
            about: { ...formData.about, [field]: updatedArray },
        });
    };

    const handleAddField = (field) => {
        setFormData({
            ...formData,
            about: {
                ...formData.about,
                [field]: [...formData.about[field], ''],
            },
        });
    };

    const handleRemoveField = (field, index) => {
        if (formData.about[field].length > 1) {
            const updatedArray = formData.about[field].filter((_, i) => i !== index);
            setFormData({
                ...formData,
                about: { ...formData.about, [field]: updatedArray },
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = { ...formData };

            let res;
            if (jobPost) {
                try {
                    res = await updateJobPost(jobPost._id, payload);
                    if (res) {
                        dispatch(editPost({ jobPostId: jobPost._id, editedData: res }));
                    }
                }
                catch (error) {
                    toast.error('Failed to update job post')
                    console.error('Failed to update job post: ', error);
                }
                finally {
                    router.push(`/jobs/details?id=${res._id}`);
                }
            }
            else {
                try {
                    res = await createJobPost(payload);
                    if (res) {
                        dispatch(addJobPost({ jobPostData: res }));
                    }
                    if (handleAddJobPost !== null) {
                        handleAddJobPost(res);
                    }
                }
                catch (error) {
                    toast.error('Failed to create job post')
                    console.error('Failed to create job post: ', error);
                }
            }
        }
        catch (error) {
            console.error('Error submitting the job post: ', error);
        }
        finally {
            setIsSubmitting(false);
            resetForm();
        }
    };

    const hasUnsavedChanges = (): boolean => {
        return (
            formData.jobTitle !== '' ||
            formData.position !== '' ||
            formData.workplaceType !== '' ||
            formData.jobLocation !== '' ||
            formData.jobType !== '' ||
            formData.about.description !== '' ||
            formData.about.educationalRequirements.some(req => req !== '') ||
            formData.about.experienceRequirements.some(req => req !== '') ||
            formData.about.additionalRequirements.some(req => req !== '')
        );
    };

    const handleClose = () => {
        if (hasUnsavedChanges()) {console.log(hasUnsavedChanges())
            setIsConfirmationModalOpen(true);
        } else {
            resetForm();
            onClose();
        }
    };

    const handleConfirmClose = () => {
        resetForm();
        onClose();
        setIsConfirmationModalOpen(false);
    };

    if (!isOpen) return null;

    return (
        <>
            <Modal
                size='5xl'
                isOpen={isOpen}
                onOpenChange={handleClose}
                className='rounded-lg bg-white w-full md:max-w-[80%] md:p-6 '
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Post a Job</ModalHeader>
                            <ModalBody>
                                <div>
                                    <form onSubmit={handleSubmit} >
                                        <div className="space-y-4 max-h-[70vh] overflow-y-scroll pb-6">
                                            <Input
                                                label="Job Title"
                                                name="jobTitle"
                                                variant="underlined"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <div className="grid lg:grid-cols-2 gap-4">
                                                <Input
                                                    label="Position"
                                                    name="position"
                                                    variant="underlined"
                                                    value={formData.position}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Input
                                                    label="Workplace Type"
                                                    name="workplaceType"
                                                    variant="underlined"
                                                    value={formData.workplaceType}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Input
                                                    label="Job Location"
                                                    name="jobLocation"
                                                    variant="underlined"
                                                    value={formData.jobLocation}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Input
                                                    label="Job Type"
                                                    name="jobType"
                                                    variant="underlined"
                                                    value={formData.jobType}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <Textarea
                                                label="Job Description"
                                                variant="underlined"
                                                value={formData.about.description}
                                                onChange={(e) => handleAboutChange('description', e.target.value)}
                                                required
                                            />

                                            {['educationalRequirements', 'experienceRequirements', 'additionalRequirements'].map((field) => (
                                                <div key={field}>
                                                    <label className="block mb-2 text-gray-500 text-sm capitalize">
                                                        {field.replace(/([A-Z])/g, ' $1')}
                                                    </label>
                                                    {formData.about[field].map((req, index) => (
                                                        <div key={index} className="flex items-center space-x-2 mb-2">
                                                            <Input
                                                                variant="underlined"
                                                                value={req}
                                                                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveField(field, index)}
                                                                className={`text-red-500 ${formData.about[field].length === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                                                    }`}
                                                                disabled={formData.about[field].length === 1}
                                                            >
                                                                <MdRemove className="text-xl border border-red-400 rounded-full" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddField(field)}
                                                        className="mt-2 text-xl border border-black rounded-full"
                                                    >
                                                        <MdAdd />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="bg-sky-500 w-full text-white rounded-lg border border-sky-500 hover:bg-white hover:text-sky-500"
                                            isDisabled={isSubmitting}
                                            isLoading={isSubmitting}
                                        >
                                            {isSubmitting ? 'Saving...' : (jobPost ? 'Update Job Post' : 'Save Job Post')}
                                        </Button>
                                    </form>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmClose}
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to close without saving?"
            />
        </>
    );
};

export default JobPostingModal;
