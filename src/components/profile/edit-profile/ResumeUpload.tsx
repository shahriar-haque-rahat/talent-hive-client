import { Button } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";
import { MdFileUpload } from "react-icons/md";

const ResumeUpload = ({ onResumeFileChange, existingResume }) => {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setResumeFile(file);
        onResumeFileChange(file);
    };

    const handleCancel = () => {
        setResumeFile(null); // Clear the file state
        onResumeFileChange(null); // Notify parent about the removal
        setPreviewUrl(undefined); // Reset preview URL
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    };

    useEffect(() => {
        if (resumeFile) {
            const url = URL.createObjectURL(resumeFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url); // Clean up object URL on unmount
        }
        setPreviewUrl(undefined);
    }, [resumeFile]);

    const renderFilePreview = () => {
        if (resumeFile?.type === "application/pdf") {
            return (
                <iframe
                    src={previewUrl}
                    width="100%"
                    height="100%"
                    className="border rounded-md"
                />
            );
        } else if (
            resumeFile?.type === "application/msword" ||
            resumeFile?.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
                previewUrl!
            )}&embedded=true`;
            return (
                <iframe
                    src={googleViewerUrl}
                    width="100%"
                    height="100%"
                    className="border rounded-md"
                />
            );
        } else if (resumeFile) {
            return (
                <div className="text-gray-500 p-4">
                    <p><strong>Name:</strong> {resumeFile.name}</p>
                    <p><strong>Type:</strong> {resumeFile.type}</p>
                    <p><strong>Size:</strong> {(resumeFile.size / 1024).toFixed(2)} KB</p>
                </div>
            );
        } else {
            return <p className="text-gray-500 p-4">No file selected.</p>;
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center">
                    <label className="flex items-center px-3 py-2 border border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white rounded-lg">
                        <MdFileUpload size={24} className="mr-2" />
                        {resumeFile || existingResume ? "Replace Resume" : "Upload Resume"}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {resumeFile && <p className="ml-4">{resumeFile.name}</p>}
                </div>
            </div>

            {resumeFile && (
                <div className="my-4 h-96 border border-gray-300 rounded-lg">
                    {renderFilePreview()}
                </div>
            )}

            {resumeFile && (
                <Button
                    onClick={handleCancel}
                    className="text-red-500 border border-red-500 bg-white py-1 px-2 rounded-lg hover:text-white hover:bg-red-500"
                >
                    Cancel Upload
                </Button>
            )}
        </>
    );
};

export default ResumeUpload;
