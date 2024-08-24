import React from 'react';
import NavbarDrawer from './NavbarDrawer';
import NavbarItems from './NavbarItems';
import NavbarDropdown from './NavbarDropdown';
import Link from 'next/link';

const NavbarContent = () => {
    return (
        <>
            <div className="flex items-center justify-between gap-4 is-full relative">
                <div className="flex gap-2 items-center">
                    <div className="lg:hidden">
                        <NavbarDrawer />
                    </div>
                    <Link href={'/'} className="text-xl font-bold text-sky-500">
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
