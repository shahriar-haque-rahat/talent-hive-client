import ContactList from '@/components/messaging/messaging-left-section/ContactList';
import Conversation from '@/components/messaging/messaging-right-section/Conversation';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({ searchParams }: PageProps) => {
    const userId = searchParams.userId;
    const contactId = searchParams.contactId;

    // if (!userId || !contactId) {
    //     redirect(`/messaging`)
    // }
    return (
        <>
            <div className=' grid grid-cols-3 gap-2'>
                <div className=' col-span-1'><ContactList /></div>
                <div className=' col-span-2'><Conversation userId={userId as string} contactId={contactId as string} /></div>
            </div>
        </>
    );
};

export default page;