import React from 'react';
import ProfileHeader from './ProfileHeader';
import TimelinePostSection from './TimelinePostSection';
import Timeline from './Timeline';
import LeftBar from './LeftBar';

const LeftSection = () => {
    return (
        <>
            <div className=' flex'>
                <LeftBar />
                <div>
                    <ProfileHeader />
                    <TimelinePostSection />
                    <Timeline />
                </div>
            </div>
        </>
    );
};

export default LeftSection;