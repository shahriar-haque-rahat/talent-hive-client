import CompanyDetails from '@/components/company/company-details/CompanyDetails';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

const page = ({ searchParams }: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/profile`)
    }
    return (
        <div>
            <CompanyDetails id={id as string} />
        </div>
    );
};

export default page;