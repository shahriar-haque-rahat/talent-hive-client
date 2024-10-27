'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatList } from '@/apiFunctions/messagingData';
import { useRouter } from 'next/navigation';
import { Image } from '@nextui-org/react';
import { setChatList } from '@/redux/chatListSlice';

const ContactList = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);
    const contacts = useSelector((state: any) => state.chatList.chatList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await getChatList(user._id);
                if (response) {
                    dispatch(setChatList(response));
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching contacts:", error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, [user._id]);

    const handleSelectContact = (contactId: string) => {
        router.push(`/messaging?userId=${user._id}&contactId=${contactId}`);
    };

    if (loading) {
        return <div>Loading contacts...</div>;
    }

    return (
        <div className='bg-white rounded-lg border shadow h-[calc(100vh-110px)]'>
            <p className='text-2xl font-bold h-20 p-4 border-b border-gray-300'>Chats</p>
            <div className='h-[calc(100vh-191px)] overflow-y-scroll rounded-bl-lg'>
                {contacts.length > 0 ? (
                    contacts.map((contact, index) => (
                        <div
                            key={index}
                            className='flex gap-3 items-center p-4 border-b cursor-pointer hover:bg-gray-100'
                            onClick={() => handleSelectContact(contact.otherUserId)}
                        >
                            <Image
                                src={contact.otherUserProfileImage}
                                alt={contact.otherUserFullName}
                                className="rounded-full border-2 border-white cursor-pointer w-14 h-14 object-cover object-top"
                            />
                            <div>
                                <p className='font-bold'>{contact.otherUserFullName}</p>
                                <p className='text-gray-500 text-sm'>{contact.lastMessage}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className=' pl-4 pt-2'>No contacts found.</div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
