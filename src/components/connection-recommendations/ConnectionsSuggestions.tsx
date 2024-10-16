import React, { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react';
import { TiArrowRight } from 'react-icons/ti';
import { FiPlus } from "react-icons/fi";
import { suggestionUsers } from '@/apiFunctions/userData';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { sendConnectionRequest } from '@/apiFunctions/connection';
import { useRouter } from 'next/navigation';

const ConnectionsSuggestions = () => {
    const user = useSelector((state: any) => state.user.user);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const handleProfile = (userId) => {
        router.push(`/profile?id=${userId}`);
    }

    const handleSendConnectionRequest = (receiverId) => {
        sendConnectionRequest(user._id, receiverId);
    }

    const fetchUsers = async () => {
        const fetchedUsers = await suggestionUsers(user._id);

        setUsers(fetchedUsers.users);
    }

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers()
        }
    }, [])

    return (
        <>
            <div className=' bg-white p-3 xl:p-6 border shadow rounded-lg'>
                <p className=' mb-4 font-semibold'>Add to your connect</p>
                {
                    users?.map(user => (
                        <div className='flex gap-3 xl:gap-6 mb-4'>
                            <div className='flex-shrink-0 w-16 h-16 my-auto'>
                                <Image
                                    onClick={() => handleProfile(user._id)}
                                    src={user.profileImage ? user.profileImage : "/assets/user.png"}
                                    alt="Profile"
                                    className=" cursor-pointer rounded-full w-16 h-16 border-2 border-white object-cover object-top"
                                />
                            </div>

                            <div className='flex-grow flex flex-col gap-1 justify-center'>
                                <div>
                                    <h1 onClick={() => handleProfile(user._id)} className='cursor-pointer hover:underline font-semibold'>{user.fullName}</h1>
                                    <p className='text-xs text-gray-500'>
                                        {user.designation ? user.designation : 'No designation available'}
                                    </p>
                                </div>
                                <button onClick={() => handleSendConnectionRequest(user._id)} className='w-20 xl:w-24 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                                    <FiPlus size={16} />Add
                                </button>
                            </div>
                        </div>
                    ))
                }
                <Link href={"/connection-recommendations"}>
                    <p className=' text-gray-600 mt-4 font-semibold text-xs flex items-center cursor-pointer'>View all recommendations <TiArrowRight size={20} /></p>
                </Link>
            </div>
        </>
    );
};

export default ConnectionsSuggestions;
