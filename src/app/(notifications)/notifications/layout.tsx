import React from 'react';

export const metadata = {
    title: "Notifications",
    description: "Notifications page of Talent Hive.",
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}