import React from 'react';

export const metadata = {
    title: "Forgot Password",
    description: "Forgot Password page of Talent Hive.",
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}