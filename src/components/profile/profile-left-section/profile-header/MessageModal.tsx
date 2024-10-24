import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '@/apiFunctions/messagingData';
import { addChatContact } from '@/redux/chatListSlice';

const MessageModal = ({ isOpen, onClose, userProfile }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (message.trim()) {
            const newMessage = {
                sender: user._id,
                receiver: userProfile._id,
                message,
            };

            try {
                const updatedConversation = await sendMessage(newMessage);

                const lastMessageData = updatedConversation.messages[updatedConversation.messages.length - 1];
                const lastMessageSender = lastMessageData.sender;

                dispatch(addChatContact({
                    otherUserId: userProfile._id,
                    lastMessage: lastMessageData.message,
                    lastMessageTime: lastMessageData.createdAt,
                    otherUserProfileImage: lastMessageSender.profileImage,
                    otherUserFullName: lastMessageSender.fullName,
                }));

                setMessage('');
                onClose();
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                <div className="bg-white w-full max-w-[80%] h-[110vh] md:h-[90vh] lg:h-fit p-6 rounded-lg relative overflow-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={24} />
                    </button>
                    <h2 className="text-xl font-bold mb-4">Send a Message</h2>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 resize-none h-32 outline-none"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={handleSend}
                            className="bg-sky-500 text-white hover:bg-sky-600 rounded-lg"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageModal;
