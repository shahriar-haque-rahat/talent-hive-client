import React from 'react';
import LeftSidebar from './LeftSidebar';
import CentralFeed from './CentralFeed';
import RightSidebar from './RightSidebar';

const Home = () => {
    return (
        <>
            <div className=' grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <div className=' hidden md:block'><LeftSidebar /></div>
                <div className='  col-span-2'><CentralFeed /></div>
                <div className=' hidden lg:block'><RightSidebar /></div>
            </div>
        </>
    );
};

export default Home;