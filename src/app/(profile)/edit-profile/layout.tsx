import React from 'react';

export const metadata = {
    title: "Edit Profile",
    description: "Edit Profile page of Talent Hive.",
};

export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}