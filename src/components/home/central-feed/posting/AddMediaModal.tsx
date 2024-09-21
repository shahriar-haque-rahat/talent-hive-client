import React, { useRef, useState, useEffect } from 'react';
import { MdClose, MdFileUpload } from 'react-icons/md';

const AddMediaModal = ({ onUpload }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleUpload = () => {
        onUpload(mediaFiles);
    };

    return (
        <>
            <div className="flex flex-col h-full overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Upload Media</h2>

                <div className="flex-grow overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {mediaFiles.map((file, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={typeof file === 'object' ? URL.createObjectURL(file) : file}
                                    alt="media preview"
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex justify-between">
                    <label className="px-3 py-1 border border-sky-500 text-sky-500 rounded-lg flex items-center cursor-pointer hover:bg-sky-500 hover:text-white">
                        <MdFileUpload size={24} className="mr-2" />
                        Add Media
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleMediaChange}
                            className="hidden"
                        />
                    </label>

                    <button
                        type="button"
                        onClick={handleUpload}
                        className="px-3 py-1 border border-sky-500 bg-sky-500 text-white rounded-lg hover:bg-white hover:text-sky-500"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddMediaModal;