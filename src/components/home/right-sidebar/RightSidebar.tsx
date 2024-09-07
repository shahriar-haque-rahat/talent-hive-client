import { Image } from '@nextui-org/react';
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
                    <div className=' w-14 h-14'>
                        <Image
                            src="/assets/user.png"
                            alt="Profile"
                            className="rounded-full border-2 border-white object-cover object-center"
                        />
                    </div>

                    <div className=' flex flex-col xl:flex-row gap-1 xl:gap-3 xl:items-center'>
                        <div>
                            <h1 className=' font-semibold'>John wick</h1>
                            <p className=' text-xs text-gray-500'>Designation</p>
                        </div>
                        <button className=' w-20 xl:w-24 mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'><FiPlus size={16} />Add</button>
                    </div>
                </div>

                <p className=' mt-4 font-semibold text-xs flex items-center'>View all recommendations <TiArrowRight size={20} /></p>
            </div>
            <SidebarFooter />
        </>
    );
};

export default RightSidebar;
