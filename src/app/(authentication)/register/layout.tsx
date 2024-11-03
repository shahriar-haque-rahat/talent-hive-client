import React from 'react';

export const metadata = {
    title: "Register",
    description: "Register page of Talent Hive.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}