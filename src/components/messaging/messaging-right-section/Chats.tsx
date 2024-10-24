import { sendMessage } from '@/apiFunctions/messagingData';
import { updateChatContact } from '@/redux/chatListSlice';
import { Image } from '@nextui-org/react';
import React, { useEffect, useState, useRef } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

const Chats = ({ chats, userId, contactId, setChats }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef(null);

    const handleTexting = async () => {
        if (!message.trim()) return;

        const newMessage = {
            sender: userId,
            receiver: contactId,
            message,
        };

        try {
            const updatedConversation = await sendMessage(newMessage);

            const lastMessageData = updatedConversation.messages[updatedConversation.messages.length - 1];

            dispatch(updateChatContact({
                otherUserId: contactId,
                lastMessage: lastMessageData.message,
                lastMessageTime: lastMessageData.createdAt,
            }));

            setChats(updatedConversation.messages);

            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && message.trim()) {
            e.preventDefault();
            handleTexting();
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        setMessage('');
        scrollToBottom();
    }, [contactId]);

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <>
            <div ref={chatContainerRef} className='flex flex-col h-[calc(100%-150px)] p-4 pt-0 overflow-y-scroll'>
                <div className='flex-1 flex'>
                    <div className="w-full mx-auto self-end">
                        {chats && chats.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {chats.map((chat, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start ${chat.sender._id === userId ? 'self-end ml-32' : 'self-start mr-32'}`}
                                    >
                                        {chat.sender._id !== userId && (
                                            <div className="mr-2 flex-shrink-0">
                                                <Image
                                                    src={chat.sender.profileImage}
                                                    alt={chat.sender.fullName}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover object-top"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div
                                                className={`w-full p-3 rounded-lg text-sm ${chat.sender._id === userId ? 'bg-sky-300' : 'bg-gray-200'}`}
                                                style={{
                                                    borderRadius: chat.sender._id === userId
                                                        ? '0.5rem 1rem 1rem 1rem'
                                                        : '1rem 0.5rem 1rem 1rem',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {chat.message}
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className={`text-gray-500 text-xs ${chat.sender._id === userId ? 'self-end' : 'self-start'}`}>
                                                    {new Date(chat.createdAt).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 text-xl">No conversation</p>
                        )}
                    </div>
                </div>
            </div>
            {chats && chats.length > 0 &&
                <div className='p-4 rounded-b-lg'>
                    <div className='w-full flex items-center border border-gray-400 p-2 pl-4 rounded-full'>
                        <input
                            className='w-full bg-transparent outline-none'
                            type="text"
                            placeholder="Write something..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <LuSendHorizonal
                            onClick={() => message.trim() && handleTexting()}
                            size={20}
                            className={`cursor-pointer ${message.trim() ? 'text-black' : 'text-gray-400'}`}
                            style={{ pointerEvents: message.trim() ? 'auto' : 'none' }}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default Chats;
