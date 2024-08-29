import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose, MdFileUpload } from 'react-icons/md';

const AddMediaModal = ({ isOpen, onClose, onUpload }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + mediaFiles.length > 6) {
            toast.error('You can only upload up to 6 media files.');
            return;
        }
        setMediaFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveMedia = (index) => {
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        onUpload(mediaFiles);
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

                <h2 className="text-xl font-semibold mb-4">Add Media</h2>

                <div className="flex flex-col items-center mb-4">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center py-1 px-2 rounded-lg border border-sky-500 bg-sky-500 text-white hover:bg-white hover:text-sky-500"
                    >
                        <div className='flex'>
                            <MdFileUpload size={24} className="mb-1" />
                            <span>Choose Files</span>
                        </div>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaChange}
                            ref={fileInputRef}
                        />
                    </label>
                    <p className="mt-2 text-gray-500">
                        {mediaFiles.length} file(s) selected (Max: 6)
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 overflow-auto">
                    {mediaFiles.map((file, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                                onClick={() => handleRemoveMedia(index)}
                                className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                            >
                                <MdClose size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleUpload}
                        className="w-full px-3 py-1 border border-sky-500 bg-sky-500 text-white rounded-lg hover:bg-white hover:text-sky-500"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMediaModal;
