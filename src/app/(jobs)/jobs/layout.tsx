import React from 'react';

export const metadata = {
    title: "Jobs",
    description: "Jobs page of Talent Hive.",
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}