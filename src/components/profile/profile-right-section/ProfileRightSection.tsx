'use client'

import CompanySuggestions from '@/components/company/CompanySuggestions';
import ConnectionsSuggestions from '@/components/connection-recommendations/ConnectionsSuggestions';
import React from 'react';

const ProfileRightSection = () => {
    return (
        <div className=' space-y-3'>
            <ConnectionsSuggestions />
            <CompanySuggestions />
        </div>
    );
};

export default ProfileRightSection;
