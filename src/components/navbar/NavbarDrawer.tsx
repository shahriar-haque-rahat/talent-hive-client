import { toggleMenu } from '@/redux/navbarSlice';
import React from 'react';
import { IoClose, IoReorderThreeSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const NavbarDrawer = () => {
    const { menuOpen } = useSelector((state: any) => state.navbar)
    const dispatch = useDispatch()

    return (
        <>
            <div >
                {
                    menuOpen ?
                        <IoClose size={24} onClick={() => dispatch(toggleMenu())} />
                        :
                        <IoReorderThreeSharp size={24} onClick={() => dispatch(toggleMenu())} />
                }
            </div >
        </>
    );
};

export default NavbarDrawer;