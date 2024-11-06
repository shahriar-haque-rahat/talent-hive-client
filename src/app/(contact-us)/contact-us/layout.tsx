import React from 'react';

export const metadata = {
    title: "Support",
    description: "Support page of Talent Hive.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}