import React from 'react';

export const metadata = {
    title: "Login",
    description: "Login page of Talent Hive.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}