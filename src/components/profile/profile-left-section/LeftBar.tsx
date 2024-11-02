'use client'

import React, { useContext, useState } from 'react';
import { TbUserEdit } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Tooltip } from '@nextui-org/react';
import { AuthContextValues } from '@/types/auth/auth.types';
import { AuthContext } from '@/provider/AuthProvider';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { IoDocument } from 'react-icons/io5';
import { BiBookmarkAlt } from 'react-icons/bi';
import SavedPosts from '@/components/saved-posts/SavedPosts';

const LeftBar = () => {
    const user = useSelector((state: any) => state.user.user);
    const userProfile = useSelector((state: any) => state.user.userProfile);
    const { logout } = useContext(AuthContext) as AuthContextValues;

    const [openSaveList, setOpenSaveList] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleInvalidLink = (message: string) => {
        toast.error(message);
    };

    return (
        <>
            <div className='fixed h-3/4 bg-sky-500 -ml-1 md:-ml-6 text-white p-1 lg:p-2 rounded-r-lg 2xl:rounded-lg flex flex-col justify-between items-center top-1/2 transform -translate-y-1/2'>
                <div className='pt-32'>
                    {/* Facebook Link */}
                    {userProfile?.facebookLink?.startsWith('http') ? (
                        <Link
                            href={userProfile.facebookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Tooltip placement="right-end" content="Facebook">
                                <div>
                                    <FaFacebook className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                                </div>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip placement="right-end" content="Facebook">
                            <div onClick={() => handleInvalidLink('Facebook link not available')}>
                                <FaFacebook className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    )}

                    {/* LinkedIn Link */}
                    {userProfile?.linkedInLink?.startsWith('http') ? (
                        <Link
                            href={userProfile.linkedInLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Tooltip placement="right-end" content="LinkedIn">
                                <div>
                                    <FaLinkedin className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                                </div>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip placement="right-end" content="LinkedIn">
                            <div onClick={() => handleInvalidLink('LinkedIn link not available')}>
                                <FaLinkedin className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    )}

                    {/* Resume Link */}
                    {userProfile?.resumeLink?.startsWith('http') ? (
                        <Link
                            href={userProfile.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Tooltip placement="right-end" content="Resume">
                                <div>
                                    <IoDocument className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                                </div>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Tooltip placement="right-end" content="Resume">
                            <div onClick={() => handleInvalidLink('Resume not available')}>
                                <IoDocument className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    )}

                    {/* Direct email */}
                    <Link href={`mailto:${userProfile?.email}`}>
                        <Tooltip placement="right-end" content="Email">
                            <div>
                                <MdEmail className='cursor-pointer text-xl lg:text-3xl xl:text-4xl mb-3' />
                            </div>
                        </Tooltip>
                    </Link>
                </div>

                {userProfile._id === user._id &&
                    <div className='space-y-3 pb-6'>
                        <Tooltip placement="right-end" content="Saved Posts">
                            <div>
                                <BiBookmarkAlt
                                    onClick={() => setOpenSaveList(true)}
                                    className='mb-2 cursor-pointer text-xl lg:text-3xl xl:text-4xl'
                                />
                            </div>
                        </Tooltip>

                        <Link href={"/edit-profile"}>
                            <Tooltip placement="right-end" content="Edit Profile">
                                <div>
                                    <TbUserEdit className='cursor-pointer text-xl lg:text-3xl xl:text-4xl' />
                                </div>
                            </Tooltip>
                        </Link>

                        <Tooltip placement="right-end" content="Logout">
                            <div>
                                <MdLogout onClick={handleLogout} className=' cursor-pointer text-xl lg:text-3xl xl:text-4xl' />
                            </div>
                        </Tooltip>
                    </div>
                }
            </div>

            {
                <SavedPosts
                    userId={user._id}
                    openSaveList={openSaveList}
                    setOpenSaveList={setOpenSaveList}
                />
            }
        </>
    );
};

export default LeftBar;
