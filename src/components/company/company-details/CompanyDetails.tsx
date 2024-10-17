import React from 'react';
import DetailsPage from '../company-left-section/DetailsPage';
import CompanySuggestions from '../company-recommendations/CompanySuggestions';

interface CompanyDetails {
    id: string
}

const CompanyDetails = ({ id }: CompanyDetails) => {
    return (
        <div className=' grid lg:grid-cols-4 gap-2'>
            <div className=' lg:col-span-3'><DetailsPage id={id} /></div>
            <div className='hidden lg:block'><CompanySuggestions /></div>
        </div>
    );
};

export default CompanyDetails;
