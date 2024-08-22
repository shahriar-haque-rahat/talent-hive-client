'use client'

import { AuthContext } from '@/provider/AuthProvider';
import { Button } from '@nextui-org/react';
import React, { useContext } from 'react';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div>
            Navbar
            <Button
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default Navbar;