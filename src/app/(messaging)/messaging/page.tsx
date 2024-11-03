import ContactList from '@/components/messaging/messaging-left-section/ContactList';
import Conversation from '@/components/messaging/messaging-right-section/Conversation';
import React from 'react';

const page = () => {
    return (
        <>
            <div className=' md:grid md:grid-cols-3 gap-2'>
                <div className='md:col-span-1'><ContactList /></div>
                <div className='hidden md:block md:col-span-2'><Conversation userId={null} contactId={null} /></div>
            </div>
        </>
    );
};

export default page;