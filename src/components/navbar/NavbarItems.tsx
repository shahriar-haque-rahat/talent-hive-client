'use client'

import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { MdMessage } from "react-icons/md";
import { IoNotificationsSharp } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '@/redux/navbarSlice';
import Link from 'next/link';

const NavbarItems = () => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const menuOpen = useSelector((state: any) => state.navbar.menuOpen);
    const isLoading = useSelector((state: any) => state.loading.isLoading);

    const getLinkClass = (path: string) => {
        return pathName === path && isLoading === false
            ? 'text-black font-bold border-b-2 border-black'
            : 'text-gray-600';
    };


    return (
        <>
            <div>
                {/* small device */}
                <ul className={`flex flex-col duration-500 ease-in-out bg-white border py-4 px-6 w-3/5 md:w-1/2 lg:hidden gap-4 font-semibold absolute h-screen z-20 ${menuOpen ? "left-0" : "-left-[500px]"} -ml-4 md:-ml-5 mt-[0.52rem] pt-6 border-none shadow-sm`} >

                    <li className={`cursor-pointer`}>
                        <Link className={`flex items-center gap-2 text-xs ${getLinkClass('/')}`} href='/' onClick={() => dispatch(toggleMenu())}>
                            <FaHome size={22} />Home
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`flex items-center gap-2 text-xs ${getLinkClass('/jobs')}`} href='/jobs' onClick={() => dispatch(toggleMenu())}>
                            <MdWork size={22} />Jobs
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`flex items-center gap-2 text-xs ${getLinkClass('/messaging')}`} href='/messaging' onClick={() => dispatch(toggleMenu())}>
                            <MdMessage size={22} />Messaging
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`flex items-center gap-2 text-xs ${getLinkClass('/notifications')}`} href='/notifications' onClick={() => dispatch(toggleMenu())}>
                            <IoNotificationsSharp size={22} />Notifications
                        </Link>
                    </li>
                </ul>

                {/* large device */}
                <ul className="hidden lg:flex gap-4 font-semibold relative">
                    <li className={`cursor-pointer`}>
                        <Link className={`w-16 text-xs flex flex-col items-center ${getLinkClass('/')}`} href='/'>
                            <FaHome size={22} />Home
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`w-16 text-xs flex flex-col items-center ${getLinkClass('/jobs')}`} href='/jobs'>
                            <MdWork size={22} />Jobs
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`w-16 text-xs flex flex-col items-center ${getLinkClass('/messaging')}`} href='/messaging'>
                            <MdMessage size={22} />Messaging
                        </Link>
                    </li>

                    <li className={`cursor-pointer`}>
                        <Link className={`w-16 text-xs flex flex-col items-center ${getLinkClass('/notifications')}`} href='/notifications'>
                            <IoNotificationsSharp size={22} />Notifications
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavbarItems;
