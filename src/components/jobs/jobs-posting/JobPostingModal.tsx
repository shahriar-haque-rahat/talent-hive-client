'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { MdClose, MdAdd, MdRemove } from 'react-icons/md';
import { createJobPost } from '@/apiFunctions/jobpostData';
import { addJobPost } from '@/redux/jobPostSlice';
import { useDispatch } from 'react-redux';

const JobPostingModal = ({ isOpen, onClose, companyId }) => {
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

            const res = await createJobPost(payload);

            if (res) {
                dispatch(addJobPost({ jobPostData: res }))
            }

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

            onClose();
        }
        catch (error) {
            console.error('Error submitting the job posting:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-full max-w-[80%] h-[80vh] p-6 rounded-lg relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-2xl mb-4">Post a Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Button
                        type="submit"
                        className="bg-sky-500 w-full text-white rounded-lg border border-sky-500 hover:bg-white hover:text-sky-500"
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Save Changes'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JobPostingModal;
