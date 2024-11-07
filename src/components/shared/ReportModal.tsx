import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, Textarea, Button } from '@nextui-org/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ReportModal = ({ isOpen, toggleReportModal, postId, postUser }) => {
    const user = useSelector((state: any) => state.user.user);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (user._id) {
                const response = await axios.post('/api/nodemailer/post-report', {
                    message: message,
                    userId: user?._id,
                    userName: user?.fullName,
                    userEmail: user?.email,
                    postId: postId,
                    postUserId: postUser._id,
                    postUserName: postUser.fullName,
                    postUserEmail: postUser.email,
                });

                if (response.status === 200) {
                    toast.success('Report has been submitted')
                } else {
                    toast.error('Failed to submit report')
                    console.error('Failed to submit report');
                }
            }
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setMessage('');
            setIsSubmitting(false);
            toggleReportModal();
        }
    };

    return (
        <>
            <Modal
                size="5xl"
                isOpen={isOpen}
                onOpenChange={toggleReportModal}
                className="rounded-lg w-3/4"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Report Issue</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <Textarea
                                        isRequired
                                        variant='underlined'
                                        labelPlacement="outside"
                                        placeholder="Tell us what's wrong..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className=" rounded-lg bg-white outline-none"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!message || isSubmitting}
                                        className="mt-4 rounded-lg bg-sky-500 text-white w-28"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Submit Report'}
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReportModal;
