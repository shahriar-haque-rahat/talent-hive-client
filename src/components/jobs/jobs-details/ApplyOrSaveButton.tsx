'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { MdFileUpload } from 'react-icons/md';
import { useEdgeStore } from '@/edgestore/edgestore';
import ResumeUploadModal from './ResumeUploadModal';
import { useSelector } from 'react-redux';
import { applyForJobPost } from '@/apiFunctions/jobpostData';
import toast from 'react-hot-toast';

const ApplyOrSaveButton = ({ jobPostId, applicants }) => {
    const user = useSelector((state: any) => state.user.user);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { edgestore } = useEdgeStore();
    const fileInputRef = useRef(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (applicants && user) {
            const userHasApplied = applicants?.some(applicant => applicant.applicantId._id === user._id);
            setHasApplied(userHasApplied);
        }
        setLoading(false);
    }, [applicants, user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
        setIsModalOpen(true);
    };

    const handleConfirmUpload = async () => {
        if (!resumeFile) return;

        setUploading(true);
        try {
            const uploadRes = await edgestore.userResumes.upload({
                file: resumeFile,
                onProgressChange: (progress) => {
                    console.log('Resume upload progress:', progress);
                },
            });

            if (uploadRes) {
                const applicantData = {
                    resumeLink: uploadRes.url,
                    applicantId: user._id,
                };

                const res = await applyForJobPost(jobPostId, applicantData);

                toast.success('Application submitted! We’ll get back to you shortly. Good luck!');
                setHasApplied(true);
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
        } finally {
            setUploading(false);
            setIsModalOpen(false);
            setResumeFile(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setResumeFile(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="flex gap-3 pt-3">
                {hasApplied ? (
                    <Button
                        disabled
                        className=" cursor-not-allowed h-10 px-6 rounded-lg border border-gray-400 text-gray-500 bg-gray-200"
                    >
                        Applied
                    </Button>
                ) : (
                    <>
                        <label
                            className=" h-10 flex items-center px-6 border border-sky-500 text-white bg-sky-500 cursor-pointer hover:bg-white hover:text-sky-500 rounded-lg"
                        >
                            <MdFileUpload size={24} className="mr-2" />
                            Apply
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </>
                )}

                <Button
                    className=" h-10 px-6 rounded-lg border border-sky-500 text-sky-500 bg-white hover:bg-sky-500 hover:text-white text-lg"
                >
                    Save
                </Button>
            </div>

            <ResumeUploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirmUpload={handleConfirmUpload}
                onFileChange={handleFileChange}
                uploading={uploading}
                resumeFile={resumeFile}
            />

            {hasApplied && (
                <p className="text-red-500 mt-2">
                    You have already applied. Please contact the company if you wish to update your resume.
                </p>
            )}
        </>
    );
};

export default ApplyOrSaveButton;
