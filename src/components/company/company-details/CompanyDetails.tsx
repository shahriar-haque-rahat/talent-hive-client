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
            <div className='hidden lg:block'><CompanyRightSection/></div>
        </div>
    );
};

export default CompanyDetails;
