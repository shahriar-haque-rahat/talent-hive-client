'use client'

import React from 'react';
import LeftSidebar from './home-left-section/HomeLeftSection';
import NewsFeed from './central-feed/NewsFeed';
import RightSidebar from './home-right-section/HomeRightSection';

const Home = () => {
    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
            {/* Left Sidebar */}
            <div className="hidden md:block">
                <div className="sticky top-20 z-10">
                    <LeftSidebar />
                </div>
            </div>

            {/* News Feed */}
            <div className="col-span-2">
                <NewsFeed />
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block">
                <div className="sticky top-20 z-10">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;
