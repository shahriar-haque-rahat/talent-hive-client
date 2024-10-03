import React from 'react';
import { Image } from '@nextui-org/react';
import { FiPlus } from "react-icons/fi";

const UserConnectionCard = ({ user }) => {
    return (
        <>
            <div key={user._id} className='flex flex-col bg-white justify-center items-center gap-3 rounded-lg border shadow'>
                <div className=' w-full relative'>
                    <Image
                        src={user.coverImage ? user.coverImage : "/assets/bg.jpg"}
                        alt="Profile"
                        className="w-full h-28 rounded-none rounded-t-lg"
                    />

                    <div className='w-full flex justify-center absolute top-6'>
                        <Image
                            src={user.profileImage ? user.profileImage : "/assets/user.png"}
                            alt="Profile"
                            className="rounded-full w-36 h-36 border-2 border-white object-cover object-top"
                        />
                    </div>
                </div>

                <div className=' w-full flex flex-col gap-3 mt-14 pt-0 p-3 items-center justify-center'>
                    <div className=' text-center'>
                        <h1 className='font-semibold'>{user.fullName}</h1>
                        <p className='text-xs text-gray-500'>
                            {user.designation ? user.designation : 'No designation available'}
                        </p>
                    </div>
                    <button className='w-full mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'>
                        <FiPlus size={16} />Add
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserConnectionCard;
