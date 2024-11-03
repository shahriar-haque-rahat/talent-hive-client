import React from 'react';

export const metadata = {
    title: "My Connections",
    description: "My Connections page of Talent Hive.",
};

export default function MyConnectionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}