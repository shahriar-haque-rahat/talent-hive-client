import CompanyDetails from '@/components/company/company-details/CompanyDetails';
import { PageProps } from '@/types/global/global.types';
import { redirect } from 'next/navigation';
import React from 'react';

async function fetchCompanyData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/metadata/${id}`);

    if (!response.ok) {
        throw new Error('Company not found');
    }
    return response.json();
}

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams.id;

    if (!id) {
        redirect('/company-recommendations');
        return {};
    }

    const companyData = await fetchCompanyData(id);

    return {
        title: `${companyData.companyName}`,
        description: `Details about ${companyData.companyName}, a featured company on Talent Hive.`,
    };
}

const page = ({ searchParams }: PageProps) => {
    const id = searchParams.id;

    if (!id) {
        redirect(`/company-recommendations`)
    }
    return (
        <div>
            <CompanyDetails id={id as string} />
        </div>
    );
};

export default page;
