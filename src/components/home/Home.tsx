'use client'

import React from 'react';
import LeftSidebar from './home-left-section/HomeLeftSection';
import NewsFeed from './central-feed/NewsFeed';
import RightSidebar from './home-right-section/HomeRightSection';

const Home = () => {
    return (
        <>
            <div className=' grid md:grid-cols-3 lg:grid-cols-4 gap-2'>
                <div className=' hidden md:block'><LeftSidebar /></div>
                <div className='  col-span-2'><NewsFeed /></div>
                <div className=' hidden lg:block'><RightSidebar /></div>
            </div>
        </>
    );
};

export default Home;
