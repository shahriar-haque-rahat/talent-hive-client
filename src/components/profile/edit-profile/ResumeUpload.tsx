import React, { useState, useRef } from "react";
import { MdFileUpload } from "react-icons/md";

const ResumeUpload = ({ onResumeFileChange, existingResume }) => {
    const [resumeFile, setResumeFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
        onResumeFileChange(file);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <label
                    className="flex items-center px-3 py-2 border border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white rounded-lg"
                >
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

                {resumeFile && (
                    <p className="ml-4">{resumeFile.name}</p>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
