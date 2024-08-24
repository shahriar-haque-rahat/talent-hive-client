import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues } from '@/types/auth/auth.types';
import { Image } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import Link from 'next/link';

const NavbarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext) as AuthContextValues;
    // console.log(user?.email);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="relative">
            {
                user
                    ? <div>
                        <Link href='/login'>
                            <button className=" w-full text-sm px-3 py-1 text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-500">
                                Login
                            </button>
                        </Link>
                    </div>
                    : <div>
                        <div onClick={toggleDropdown} className="cursor-pointer rounded-full w-10 lg:w-12 h-10 lg:h-12 border border-gray-200">
                            <Image
                                src="/assets/user.png"
                                alt="Profile"
                                className="rounded-full cursor-pointer"
                            />
                        </div>
                        {
                            isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</button>
                                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</button>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default NavbarDropdown;
