import React from 'react';
import { MdOutlineCopyright } from "react-icons/md";

const SidebarFooter = () => {
    return (
        <>
            <div>
                <div className=' p-3 text-gray-400 text-xs grid grid-cols-2 text-center gap-3'>
                    <p>About</p>
                    <p>Contact</p>
                    <p>Help Center</p>
                    <p>Privacy & Terms</p>
                </div>

                <div className=' flex justify-center'>
                    <p className=' text-xs flex gap-1 items-center'><span className=' text-sky-500 font-bold'>Talent Hive</span> Corporation <MdOutlineCopyright /> 2024</p>
                </div>
            </div>
        </>
    );
};

export default SidebarFooter;
