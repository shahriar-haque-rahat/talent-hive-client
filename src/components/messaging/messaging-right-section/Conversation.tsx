'use client'

import React, { useState, useEffect } from 'react';
import { getConversation, sendMessage } from '@/apiFunctions/messagingData';
import Chats from './Chats';
import { Image } from '@nextui-org/react';

interface Conversation {
    userId: string
    contactId: string
}

const Conversation = ({ userId, contactId }: Conversation) => {
    const [chats, setChats] = useState([]);
    const [contactPerson, setContactPerson] = useState(null);

    const fetchChats = async () => {
        const conversation = await getConversation(userId, contactId);

        if (conversation) {
            setChats(conversation.messages);

            const contact = conversation.user1?._id === contactId ? conversation.user1 : conversation.user2;
            if (contact) {
                setContactPerson(contact);
            }
        }
    };

    useEffect(() => {
        if (userId !== null && contactId !== null) {
            fetchChats();
        }
    }, [userId, contactId]);

    return (
        <div className='bg-white rounded-lg border shadow h-[calc(100vh-110px)]'>
            {contactPerson &&
                <div className='h-20 p-4 border-b border-gray-300'>
                    <div className='flex gap-3 xl:gap-6 mb-4'>
                        <div className='flex-shrink-0 w-12 h-12 my-auto'>
                            <Image
                                src={contactPerson.profileImage ? contactPerson.profileImage : "/assets/user.png"}
                                alt="Profile"
                                className=" cursor-pointer rounded-full w-12 h-12 border border-gray-300 object-cover object-top"
                            />
                        </div>

                        <div className='flex-grow flex flex-col gap-1 justify-center'>
                            <h1 className='flex-wrap font-semibold hover:underline cursor-pointer'>{contactPerson.fullName}</h1>
                        </div>
                    </div>
                </div>
            }
            <Chats chats={chats} userId={userId} contactId={contactId} setChats={setChats} />
        </div>
    );
};

export default Conversation;
