import React from 'react';
import SidebarFooter from './SidebarFooter';
import ConnectionsSuggestions from '../../connection-recommendations/ConnectionsSuggestions';
import CompanySuggestions from '@/components/company/company-recommendations/CompanySuggestions';


const HomeRightSection = () => {
    return (
        <>
            <div className=' space-y-2'>
                <ConnectionsSuggestions />
                <CompanySuggestions />
                <SidebarFooter />
            </div>
        </>
    );
};

export default HomeRightSection;
