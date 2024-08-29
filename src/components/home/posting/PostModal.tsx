import React, { useState, FormEventHandler, useContext } from 'react';
import { MdPermMedia, MdArticle, MdClose } from 'react-icons/md';
import AddMediaModal from './AddMediaModal';
import DiscardModal from './DiscardModal';
import { AuthContext } from '@/provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostModal = ({ isOpen, onClose }) => {
    const { user } = useContext(AuthContext);
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState([]);
    const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

    const handleAddMedia = (uploadedMedia) => {
        setMedia(uploadedMedia);
    };

    const handleDiscard = () => {
        setCaption('');
        setMedia([]);
        onClose();
        setIsDiscardModalOpen(false);
    };

    const handleClose = () => {
        if (caption || media.length > 0) {
            setIsDiscardModalOpen(true);
        } else {
            onClose();
        }
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('caption', caption);
        media.forEach((file, index) => formData.append(`media[${index}]`, file));

        const postData = {
            userUid: user?.uid,
            content: formData.get('caption'),
            media: media.map((file) => file.name),
        }
        // console.log('post data:', postData);
        if (postData) {
            uploadData(postData);
        }

        handleDiscard();
    };

    const uploadData = async (postData: object) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, postData);
            if (response.data) {
                toast.success('Successfully Posted');
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Post Failed');
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                <div className="bg-white w-11/12 max-w-2xl h-3/4 p-6 rounded-lg relative flex flex-col">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>

                    <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

                    <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                        <textarea
                            className="flex-grow w-full p-2 border border-gray-300 rounded-md focus:outline-none resize-none overflow-auto mb-4"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        ></textarea>

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
                                    type="button"
                                    onClick={() => setIsAddMediaModalOpen(true)}
                                    className="flex items-center text-blue-500 hover:bg-gray-100 p-2 rounded-md"
                                >
                                    <MdPermMedia className="mr-1 text-3xl md:text-lg" />
                                    <span className='hidden md:block'>Add Media</span>
                                </button>
                                <button type="button" className="flex items-center text-orange-500 hover:bg-gray-100 p-2 rounded-md">
                                    <MdArticle className="mr-1 text-3xl md:text-lg" />
                                    <span className='hidden md:block'>Job Post</span>
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-3 py-1 border border-sky-500 bg-sky-500 text-white rounded-lg hover:bg-white hover:text-sky-500"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* AddMediaModal */}
            <AddMediaModal
                isOpen={isAddMediaModalOpen}
                onClose={() => setIsAddMediaModalOpen(false)}
                onUpload={handleAddMedia}
            />

            {/* DiscardModal */}
            <DiscardModal
                isOpen={isDiscardModalOpen}
                onClose={() => setIsDiscardModalOpen(false)}
                onDiscard={handleDiscard}
            />
        </>
    );
};

export default PostModal;
