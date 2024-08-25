import React from 'react';
import LeftSidebar from './LeftSidebar';
import CentralFeed from './CentralFeed';
import RightSidebar from './RightSidebar';

const Home = () => {
    return (
        <>
            <div className=' grid grid-cols-4 gap-6'>
                <div className=' '><LeftSidebar /></div>
                <div className='  col-span-2'><CentralFeed /></div>
                <div className=' '><RightSidebar /></div>
            </div>
        </>
    );
};

export default Home;