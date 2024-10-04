import React from 'react';
import NavbarDrawer from './NavbarDrawer';
import NavbarItems from './NavbarItems';
import NavbarDropdown from './NavbarDropdown';
import Link from 'next/link';

const NavbarContent = () => {
    return (
        <>
            <div className=" max-w-[1440px] m-auto h-16 px-6 py-2 flex items-center justify-between gap-4 relative">
                <div className="flex gap-2 items-center">
                    <div className="lg:hidden">
                        <NavbarDrawer />
                    </div>
                    <Link href={'/'} className="text-xl font-bold text-sky-500 h-16 flex items-center">
                        Talent Hive
                    </Link>
                </div>

                <NavbarItems />

                <NavbarDropdown />
            </div>
        </>
    );
};

export default NavbarContent;
