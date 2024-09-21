import React, { useRef, useState, useEffect } from 'react';
import { MdClose, MdFileUpload } from 'react-icons/md';
import toast from 'react-hot-toast';

const AddMediaModal = ({ isOpen, onClose, onUpload, initialMedia = [], setRemovedMedia, isEditing }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMediaFiles(initialMedia);
    }, [initialMedia]);

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + mediaFiles.length > 6) {
            toast.error('You can only select up to 6 media files.');
            return;
        }
        setMediaFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveMedia = (index) => {
        const removedFile = mediaFiles[index];
        if (isEditing && removedFile) {
            setRemovedMedia((prev) => [...prev, removedFile]);
        }
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        onUpload(mediaFiles);
        setMediaFiles([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-11/12 max-w-xl h-1/2 p-6 rounded-lg relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

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
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMedia(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    <MdClose size={16} />
                                </button>
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
        </div>
    );
};

export default AddMediaModal;