import React from 'react';
import DetailsPage from '../company-left-section/DetailsPage';
import CompanyRightSection from '../company-right-section/CompanyRightSection';

interface CompanyDetails {
    id: string
}

const CompanyDetails = ({ id }: CompanyDetails) => {
    return (
        <div className=' grid lg:grid-cols-4 gap-2'>
            <div className=' lg:col-span-3'><DetailsPage id={id} /></div>
            <div className='hidden lg:block'>
                <div className='sticky top-20 z-10 r-0'>
                    <CompanyRightSection />
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
