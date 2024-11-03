import React from 'react';

export const metadata = {
    title: "Company Recommendations",
    description: "Company Recommendations page of Talent Hive.",
};

export default function CompanyRecommendationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}