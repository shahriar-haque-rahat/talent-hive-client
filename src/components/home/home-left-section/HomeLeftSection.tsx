import React from 'react';
import PostSection from './PostSection';
import UserShortDetails from './UserShortDetails';

const HomeLeftSection = () => {

    return (
        <>
            <UserShortDetails />
            <div className='my-6 border-t border-gray-500'></div>
            <PostSection />
        </>
    );
};

export default HomeLeftSection;
