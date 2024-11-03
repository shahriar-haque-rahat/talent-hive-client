import React from 'react';

export const metadata = {
    title: "Messaging",
    description: "Messaging page of Talent Hive.",
};

export default function MessagingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}