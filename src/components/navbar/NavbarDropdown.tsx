import React, { useContext, useEffect, useRef, useState, memo } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { AuthContextValues } from '@/types/auth/auth.types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarDropdown = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useContext(AuthContext) as AuthContextValues;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            if (isOpen) {
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {user?.email ? (
                <div ref={dropdownRef} className="w-16">
                    <div onClick={toggleDropdown} className="cursor-pointer rounded-full w-10 h-10 border border-gray-200">
                        <Image
                            src="/assets/user.png"
                            alt="Profile"
                            className="rounded-full cursor-pointer"
                            width={48}
                            height={48}
                        />
                    </div>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-50">
                            <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 bg-sky-500 text-white hover:bg-sky-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-16">
                    {pathName !== '/login' && (
                        <Link href="/login">
                            <button
                                className="w-full text-sm px-3 py-1 text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-500"
                                onClick={() => sessionStorage.removeItem('redirectAfterLogin')}
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(NavbarDropdown);
