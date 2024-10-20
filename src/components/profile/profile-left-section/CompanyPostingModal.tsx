import { Button, Input, Textarea } from '@nextui-org/react';
import React, { useState, useRef } from 'react';
import { MdClose, MdFileUpload } from 'react-icons/md';
import { useEdgeStore } from '@/edgestore/edgestore';
import toast from 'react-hot-toast';
import { createCompany } from '@/apiFunctions/companyData';

interface CompanyFormData {
    employerId: string;
    companyName: string;
    companyEmail: string;
    companyProfileImage: string;
    companyContactNumber: number | '';
    companyDescription: string;
    facebookLink: string;
    linkedInLink: string;
}

const CompanyPostingModal = ({ isOpen, onClose, addCompany, employerId }) => {
    const { edgestore } = useEdgeStore();
    const [formData, setFormData] = useState<CompanyFormData>({
        employerId: employerId,
        companyName: '',
        companyEmail: '',
        companyProfileImage: '',
        companyContactNumber: '',
        companyDescription: '',
        facebookLink: '',
        linkedInLink: '',
    });
    const [media, setMedia] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'companyContactNumber' ? value : value,
        }));
    };

    const handleAddMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
        }
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let uploadedMediaUrl = '';

            // If there's an existing media (old image), delete it first
            if (formData.companyProfileImage) {
                try {
                    await edgestore.employerCompanyLogo.delete({
                        url: formData.companyProfileImage,
                    });
                    console.log('Deleted old media:', formData.companyProfileImage);
                } catch (error) {
                    console.error('Failed to delete old media:', error);
                    toast.error('Failed to delete old media.');
                }
            }

            // Upload new media
            if (media) {
                try {
                    const res = await edgestore.employerCompanyLogo.upload({
                        file: media,
                        onProgressChange: (progress) => {
                            console.log('Upload progress:', progress);
                        },
                    });
                    uploadedMediaUrl = res.url;
                } catch (error) {
                    toast.error('Failed to upload new media.');
                    console.error('Upload error:', error);
                    return;
                }
            }

            const companyData = {
                ...formData,
                companyContactNumber: formData.companyContactNumber ? Number(formData.companyContactNumber) : undefined, // Convert to number
                companyProfileImage: uploadedMediaUrl || formData.companyProfileImage,
            };

            console.log('Posting company:', companyData);

            const res = await createCompany(companyData);
            if (res) {
                addCompany(res);
            }

            toast.success('Company posted successfully');
            onClose();
        } catch (error) {
            console.error('Error posting company:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-full max-w-[80%] h-[110vh] md:h-[90vh] lg:h-fit p-6 rounded-lg relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-2xl mb-4">Post a Company</h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            label="Company Name"
                            name="companyName"
                            variant="underlined"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Company Email"
                                name="companyEmail"
                                type="email"
                                variant="underlined"
                                value={formData.companyEmail}
                                onChange={handleInputChange}
                                required
                            />

                            <Input
                                label="Contact Number"
                                name="companyContactNumber"
                                variant="underlined"
                                type="number"
                                value={formData.companyContactNumber || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <Textarea
                            label="Company Description"
                            name="companyDescription"
                            variant="underlined"
                            value={formData.companyDescription}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Facebook Link"
                                name="facebookLink"
                                variant="underlined"
                                value={formData.facebookLink}
                                onChange={handleInputChange}
                            />

                            <Input
                                label="LinkedIn Link"
                                name="linkedInLink"
                                variant="underlined"
                                value={formData.linkedInLink}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Media Preview */}
                        <div className="mb-4 h-80 border border-gray-300 rounded-lg">
                            {media ? (
                                <div className="relative w-fit h-full mx-auto">
                                    <img
                                        src={URL.createObjectURL(media)}
                                        alt="media preview"
                                        className="w-fit h-80 object-cover object-top rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveMedia}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <MdClose size={16} />
                                    </button>
                                </div>
                            ) : (
                                formData.companyProfileImage && (
                                    <div className="relative w-fit h-full mx-auto">
                                        <img
                                            src={formData.companyProfileImage}
                                            alt="current media"
                                            className="w-fit h-80 object-cover object-top rounded-md"
                                        />
                                    </div>
                                )
                            )}
                        </div>

                        {/* File Upload */}
                        <div className="flex justify-between">
                            <label
                                className={`px-3 py-1 border ${isSubmitting ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white'} rounded-lg flex items-center`}
                            >
                                <MdFileUpload size={24} className="mr-2" />
                                {media || formData.companyProfileImage ? 'Replace Image' : 'Add Image'}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAddMedia}
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                            </label>

                            <Button
                                type="submit"
                                className={`px-4 py-1 bg-sky-500 text-white rounded-lg shadow border border-sky-500 hover:bg-white hover:text-sky-500${isSubmitting ? ' opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Uploading...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyPostingModal;