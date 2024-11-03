import React from 'react';

export const metadata = {
    title: "Post Details",
    description: "Post Details page of Talent Hive.",
};

export default function PostDetailsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}