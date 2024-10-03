import React from 'react';
import { TbUserEdit } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Tooltip } from '@nextui-org/react';

const LeftBar = () => {
    return (
        <>
            <div className='fixed h-3/4 bg-sky-500 -ml-1 md:-ml-6 text-white p-1 lg:p-2 rounded-r-lg flex flex-col justify-between items-center top-1/2 transform -translate-y-1/2'>
                <div className='space-y-3 pt-32'>
                    <Tooltip placement="right-end" content="Facebook">
                        <FaFacebook className=' text-xl lg:text-3xl xl:text-4xl' />
                    </Tooltip>

                    <Tooltip placement="right-end" content="LinkedIn">
                        <FaLinkedin className=' text-xl lg:text-3xl xl:text-4xl' />
                    </Tooltip>

                    <Tooltip placement="right-end" content="Email">
                        <MdEmail className=' text-xl lg:text-3xl xl:text-4xl' />
                    </Tooltip>
                </div>

                <div className='space-y-3 pb-6'>
                    <Tooltip placement="right-end" content="Edit Profile">
                        <TbUserEdit className=' text-xl lg:text-3xl xl:text-4xl' />
                    </Tooltip>

                    <Tooltip placement="right-end" content="Logout">
                        <MdLogout className=' text-xl lg:text-3xl xl:text-4xl' />
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default LeftBar;
