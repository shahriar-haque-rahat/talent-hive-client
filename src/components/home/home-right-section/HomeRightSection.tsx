import React from 'react';
import SidebarFooter from './SidebarFooter';
import ConnectionsSuggestions from '../../connection-recommendations/ConnectionsSuggestions';
import CompanySuggestions from '@/components/company/CompanySuggestions';

const HomeRightSection = () => {
    return (
        <>
            <div className=' space-y-3'>
                <ConnectionsSuggestions />
                <CompanySuggestions />
                <SidebarFooter />
            </div>
        </>
    );
};

export default HomeRightSection;
