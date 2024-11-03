import React from 'react';

export const metadata = {
    title: "Connection Recommendations",
    description: "Connection Recommendations page of Talent Hive.",
};

export default function ConnectionRecommendationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}