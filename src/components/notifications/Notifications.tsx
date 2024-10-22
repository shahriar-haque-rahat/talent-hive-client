import React from 'react';
import NotificationsLeftSection from './notifications-left-section/NotificationsLeftSection';
import NotificationsRightSection from './notifications-right-section/NotificationsRightSection';

const Notifications = () => {
    return (
        <>
            <div className=' grid md:grid-cols-5 gap-2'>
                <div className=' md:col-span-2'><NotificationsLeftSection /></div>
                <div className=' md:col-span-3'><NotificationsRightSection /></div>
            </div>
        </>
    );
};

export default Notifications;
