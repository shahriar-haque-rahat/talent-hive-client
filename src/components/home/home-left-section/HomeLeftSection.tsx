import React from 'react';
import PostSection from './PostSection';
import UserSortDetails from './UserSortDetails';

const HomeLeftSection = () => {

    return (
        <>
            <UserSortDetails/>
            <div className='my-6 border-t border-gray-500'></div>
            <PostSection />
        </>
    );
};

export default HomeLeftSection;
