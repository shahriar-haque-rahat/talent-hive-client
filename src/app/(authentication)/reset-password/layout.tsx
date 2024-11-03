import React from 'react';

export const metadata = {
    title: "Reset Password",
    description: "Reset Password page of Talent Hive.",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}