import Messaging from '@/components/messaging/Messaging';
import { PageProps } from '@/types/global/global.types';
import React from 'react';
import { redirect } from 'next/navigation';

const page = ({ searchParams }: PageProps) => {
    const userId = searchParams.userId;
    const contactId = searchParams.contactId;

    // if (!userId || !contactId) {
    //     redirect(`/messaging`)
    // }
    return (
        <div>
            <Messaging userId={userId} contactId={contactId} />
        </div>
    );
};

export default page;