import { patchUser } from '@/apiFunctions/userData';
import { useEdgeStore } from '@/edgestore/edgestore';
import { addAuthorizedUser } from '@/redux/userSlice';
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdClose, MdFileUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const EditProfileAndCoverImageModal = ({ userId, userName, initialMediaUrl, type, onClose }) => {
    const dispatch = useDispatch();
    const [media, setMedia] = useState(null);
    const [removedMedia, setRemovedMedia] = useState(initialMediaUrl || null);
    const { edgestore } = useEdgeStore();
    const fileInputRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialMediaUrl) {
            setRemovedMedia(initialMediaUrl);
        }
    }, [initialMediaUrl]);

    const handleAddMedia = (e) => {
        const file = e.target.files[0];
        setMedia(file);
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        fileInputRef.current.value = null;
    };

    const handleSubmit = async () => {
        if (!media) return;
        setIsSubmitting(true);

        try {
            const mediaUrls = [];
            if (removedMedia) {
                try {
                    await edgestore.profileAndCoverImages.delete({ url: removedMedia });
                    console.log('Deleted old media:', removedMedia);
                } catch (error) {
                    console.error('Failed to delete old media:', removedMedia, error);
                }
            }

            // Upload new media
            if (media) {
                try {
                    const res = await edgestore.profileAndCoverImages.upload({
                        file: media,
                        onProgressChange: (progress) => {
                            console.log('Upload progress:', progress);
                        },
                    });
                    mediaUrls.push(res.url);
                } catch (error) {
                    toast.error('Failed to upload media.');
                    console.error(error);
                    return;
                }
            }

            const postData = {
                [type === 'profile' ? 'profileImage' : 'coverImage']: mediaUrls[0]
            };

            if (postData) {
                const updatedData = await patchUser(userId, postData);
                if (updatedData) {
                    dispatch(addAuthorizedUser(updatedData));
                    toast.success('Profile updated');
                }
            }

            onClose();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Modal
                size='5xl'
                isOpen={type}
                onOpenChange={onClose}
                className='bg-white w-full max-w-[80%] h-fit p-6 rounded-lg'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Edit {type === 'profile' ? 'Profile Image' : 'Cover Image'}</ModalHeader>
                            <ModalBody>
                                <div className=" overflow-auto">
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
                                            removedMedia && (
                                                <div className="relative w-fit h-full mx-auto">
                                                    <img
                                                        src={removedMedia}
                                                        alt="current media"
                                                        className="w-fit h-80 object-cover object-top rounded-md"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* File Upload */}
                                    <div className=' flex justify-between'>
                                        <div className="w-fit">
                                            <label
                                                className={`px-3 py-1 border ${isSubmitting ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-sky-500 text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white'} rounded-lg flex items-center`}
                                            >
                                                <MdFileUpload size={24} className="mr-2" />
                                                {media || removedMedia ? 'Replace Image' : 'Add Image'}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleAddMedia}
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={isSubmitting}
                                                />
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            className={`px-4 py-1 bg-sky-500 text-white rounded-lg shadow border border-sky-500 hover:bg-white hover:text-sky-500${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Uploading...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfileAndCoverImageModal;
