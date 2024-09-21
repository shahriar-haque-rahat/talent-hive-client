'use client'

import React from 'react';
import LeftSidebar from '../left-sidebar/LeftSidebar';
import NewsFeed from './NewsFeed';
import RightSidebar from '../right-sidebar/RightSidebar';

const Home = () => {
    return (
        <>
            <div className=' grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <div className=' hidden md:block'><LeftSidebar /></div>
                <div className='  col-span-2'><NewsFeed /></div>
                <div className=' hidden lg:block'><RightSidebar /></div>
            </div>
        </>
    );
};

export default Home;
