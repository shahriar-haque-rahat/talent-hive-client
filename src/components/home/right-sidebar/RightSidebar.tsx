import React from 'react';
import SidebarFooter from './SidebarFooter';
import ConnectionsSuggestions from './ConnectionsSuggestions';

const RightSidebar = () => {
    return (
        <>
            <ConnectionsSuggestions/>
            <SidebarFooter />
        </>
    );
};

export default RightSidebar;
