import React from 'react';
import ContactList from '@/components/messaging/messaging-left-section/ContactList';
import Conversation from '@/components/messaging/messaging-right-section/Conversation';

const Messaging = ({ userId, contactId }) => {

    return (
        <>
            <div className=' md:grid md:grid-cols-3 gap-2'>
                <div className='hidden md:block col-span-1'><ContactList /></div>
                <div className='md:col-span-2'><Conversation userId={userId as string} contactId={contactId as string} /></div>
            </div>
        </>
    );
};

export default Messaging;