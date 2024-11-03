import ContactList from '@/components/messaging/messaging-left-section/ContactList';
import React from 'react';

const page = () => {
    return (
        <>
            <div className=' md:grid md:grid-cols-3 gap-2'>
                <div className='md:col-span-1'><ContactList /></div>
                <div className='hidden md:block col-span-2 bg-white rounded-lg border shadow h-[calc(100vh-110px)]'>
                    <p className="text-center text-gray-600 text-xl pt-20">Select a chat to start messaging</p>
                </div>
            </div>
        </>
    );
};

export default page;