import React, { useState } from 'react';
import { MdPermMedia, MdArticle, MdClose } from 'react-icons/md';
import AddMediaModal from './AddMediaModal';

const PostModal = ({ isOpen, onClose }) => {
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState([]);
    const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);

    const handleAddMedia = (uploadedMedia) => {
        setMedia(uploadedMedia);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-70">
                <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>

                    <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

                    <div className="flex-grow flex flex-col mb-4">
                        <textarea
                            className="flex-grow w-full p-2 border border-gray-300 rounded-md focus:outline-none resize-none overflow-auto"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {media.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt="uploaded preview"
                                className="w-full h-32 object-cover rounded-md"
                            />
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <div className="flex justify-start gap-4">
                            <button
                                onClick={() => setIsAddMediaModalOpen(true)}
                                className="flex items-center text-blue-500 hover:bg-gray-100 p-2 rounded-md"
                            >
                                <MdPermMedia className="mr-1 text-3xl md:text-lg" />
                                <span className='hidden md:block'>Add Media</span>
                            </button>
                            <button className="flex items-center text-orange-500 hover:bg-gray-100 p-2 rounded-md">
                                <MdArticle className="mr-1 text-3xl md:text-lg" />
                                <span className='hidden md:block'>Job Post</span>
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="px-3 py-1 border border-sky-500 bg-sky-500 text-white rounded-lg hover:bg-white hover:text-sky-500"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AddMediaModal */}
            <AddMediaModal
                isOpen={isAddMediaModalOpen}
                onClose={() => setIsAddMediaModalOpen(false)}
                onUpload={handleAddMedia}
            />
        </>
    );
};

export default PostModal;
