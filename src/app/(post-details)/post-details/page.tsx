import PostDetails from '@/components/post-details/PostDetails';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({ searchParams }: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/`)
    }
    return (
        <div>
            <PostDetails id={id as string}/>
        </div>
    );
};

export default page;