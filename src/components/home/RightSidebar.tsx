import Image from 'next/image';
import React from 'react';
import { FiPlus } from "react-icons/fi";
import { TiArrowRight } from "react-icons/ti";
import SidebarFooter from './SidebarFooter';

const RightSidebar = () => {
    return (
        <>
            <div className=' bg-white p-3 border border-gray-300 rounded-lg'>
                <p className=' mb-4 font-semibold'>Add to your connect</p>

                <div className=' flex gap-3'>
                    <Image
                        src="/assets/user.png"
                        alt="Profile"
                        className="rounded-full border-2 border-white w-14 h-14 object-cover object-center"
                        width={48}
                        height={48}
                    />

                    <div className=' flex flex-col gap-1'>
                        <h1 className=' font-semibold'>John wick</h1>
                        <p className=' text-xs text-gray-500'>Designation</p>
                        <button className=' w-20 mt-1 text-sm py-1 px-3 rounded-full border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'><FiPlus size={16} />Add</button>
                    </div>
                </div>

                <p className=' mt-4 font-semibold text-xs flex items-center'>View all recommendations <TiArrowRight size={20} /></p>
            </div>
            <SidebarFooter/>
        </>
    );
};

export default RightSidebar;
