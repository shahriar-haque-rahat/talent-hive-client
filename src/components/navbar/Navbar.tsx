'use client'

import React from 'react';
import NavbarContent from './NavbarContent';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <>
            {(user && user._id) &&
                <div className='sticky top-0 left-0 right-0 h-20 z-50 bg-gray-100'>
                    <div className="bg-white shadow-md h-16">
                        <NavbarContent />
                    </div>
                </div>
            }
        </>
    );
};

export default Navbar;
