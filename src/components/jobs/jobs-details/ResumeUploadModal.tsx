'use client';

import React, { useEffect, useState } from 'react';
import { MdFileUpload, MdClose } from 'react-icons/md';
import { Button } from '@nextui-org/react';

const ResumeUploadModal = ({ isOpen, onClose, onConfirmUpload, onFileChange, uploading, resumeFile }) => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (resumeFile) {
            const url = URL.createObjectURL(resumeFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(undefined);
        }
    }, [resumeFile]);

    if (!isOpen) return null;

    const renderFilePreview = () => {
        if (resumeFile?.type === 'application/pdf') {
            return (
                <iframe
                    src={previewUrl}
                    width="100%"
                    height="100%"
                    className="border rounded-md"
                />
            );
        } else if (resumeFile?.type === 'application/msword' ||
            resumeFile?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(previewUrl!)}&embedded=true`;
            return (
                <iframe
                    src={googleViewerUrl}
                    width="100%"
                    height="100%"
                    className="border rounded-md"
                />
            );
        } else {
            return (
                <div className="text-gray-500 p-4">
                    <p><strong>Name:</strong> {resumeFile?.name}</p>
                    <p><strong>Type:</strong> {resumeFile?.type}</p>
                    <p><strong>Size:</strong> {(resumeFile.size / 1024).toFixed(2)} KB</p>
                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-full max-w-[80%] h-[80vh] p-6 rounded-lg relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>

                <div className="mb-4 h-[60vh] border border-gray-300 rounded-lg">
                    {renderFilePreview()}
                </div>

                <div>
                    <p className="font-bold text-red-500 text-2xl">
                        Are you sure you want to apply?
                    </p>
                    <p className="text-gray-700 text-xl">
                        You can only apply once. After submission, you won't be able to change the application data.
                    </p>
                </div>

                <div className="flex justify-between mt-4">
                    <label className="px-3 py-1 border border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white rounded-lg flex items-center">
                        <MdFileUpload size={24} className="mr-2" />
                        Replace File
                        <input
                            type="file"
                            onChange={onFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                        />
                    </label>

                    <div className="flex gap-3">
                        <Button
                            onClick={onClose}
                            className="px-4 py-1 bg-white text-red-500 rounded-lg shadow border border-red-500 hover:bg-red-500 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirmUpload}
                            className={`px-4 py-1 bg-green-500 text-white rounded-lg shadow border border-green-500 hover:bg-white hover:text-green-500${uploading ? ' opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Confirm'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeUploadModal;
