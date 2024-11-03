import Profile from '@/components/profile/Profile';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

async function fetchProfileData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/user/${id}`);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return response.json();
}

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams.id;

    if (!id) {
        redirect('/');
        return {};
    }

    const profileData = await fetchProfileData(id);

    return {
        title: `${profileData.fullName}`,
        description: `Explore the profile of ${profileData.fullName} on Talent Hive.`,
    };
}

const page = ({ searchParams }: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/`)
    }
    return (
        <div>
            <Profile id={id as string} />
        </div>
    );
};

export default page;
