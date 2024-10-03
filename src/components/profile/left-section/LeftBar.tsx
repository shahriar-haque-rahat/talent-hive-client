import React from 'react';
import { TbUserEdit } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Tooltip } from '@nextui-org/react';

const LeftBar = () => {
    return (
        <>
            <div className=' bg-sky-500 -ml-1 md:-ml-6 mr-1 px-1 lg:px-2 text-white w-20 md:w-12 lg:w-10 relative'>
                <div className=' space-y-3 fixed pt-40'>
                    <Tooltip placement="right-end" content="Facebook">
                        <FaFacebook size={20} />
                    </Tooltip>

                    <Tooltip placement="right-end" content="LinkedIn">
                        <FaLinkedin size={20} />
                    </Tooltip>
                </div>

                <div className=' space-y-3 fixed bottom-6'>
                    <Tooltip placement="right-end" content="Edit Profile">
                        <TbUserEdit size={20} />
                    </Tooltip>

                    <Tooltip placement="right-end" content="Logout">
                        <MdLogout size={20} />
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default LeftBar;