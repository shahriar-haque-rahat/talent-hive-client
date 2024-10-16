import { acceptConnectionRequest, deleteConnectionRequest, removeConnection, sendConnectionRequest } from '@/apiFunctions/connection';
import { setConnectionStatus } from '@/redux/connectionSlice';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiPlus } from "react-icons/fi";
import { useDispatch } from 'react-redux';

const UserConnectionCard = ({ loggedInUser, user, connectionStatus }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleProfile = () => {
        router.push(`/profile?id=${user._id}`);
    }

    const handleSendConnectionRequest = async (receiverId) => {
        const res = await sendConnectionRequest(loggedInUser._id, receiverId);
        if (res) {
            dispatch(setConnectionStatus({ userId: res.receiver, status: 'request_sent' }));
        }
    };

    const handleAcceptConnectionRequest = async (otherUserId) => {
        const res = await acceptConnectionRequest(loggedInUser._id, otherUserId);
        if (res) {
            dispatch(setConnectionStatus({ userId: otherUserId, status: 'connected' }));
        }
    };

    const handleDeleteConnectionRequest = async (action, otherUserId) => {
        const res = await deleteConnectionRequest(action, loggedInUser._id, otherUserId);
        if (res) {
            const newStatus = action === 'reject' ? 'no_relationship' : 'no_relationship';
            dispatch(setConnectionStatus({ userId: otherUserId, status: newStatus }));
        }
    };

    const handleRemoveConnection = async (userId2) => {
        const res = await removeConnection(loggedInUser._id, userId2);
        if (res) {
            dispatch(setConnectionStatus({ userId: userId2, status: 'no_relationship' }));
        }
    };

    return (
        <>
            <div key={user._id} className='flex flex-col bg-white justify-center items-center gap-3 rounded-lg border shadow'>
                <div className='w-full relative'>
                    <img
                        src={user.coverImage ? user.coverImage : "/assets/bg.jpg"}
                        alt="Profile"
                        className="w-full h-28 rounded-none rounded-t-lg"
                    />

                    <div className='w-full flex justify-center absolute top-6'>
                        <img
                            src={user.profileImage ? user.profileImage : "/assets/user.png"}
                            alt="Profile"
                            className="rounded-full w-36 h-36 border-2 border-white object-cover object-top"
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3 mt-14 pt-0 p-3 items-center justify-center'>
                    <div className='text-center'>
                        <h1 className='font-semibold'>{user.fullName}</h1>
                        <p className='text-xs text-gray-500'>
                            {user.designation ? user.designation : 'No designation available'}
                        </p>
                    </div>

                    <button onClick={handleProfile} className=' text-sky-500 hover:text-sky-600'>View Profile</button>

                    {/* Conditionally render the button or status based on connection status */}
                    {
                        (connectionStatus === 'no_relationship') && (
                            <button
                                onClick={() => handleSendConnectionRequest(user._id)}
                                className='w-full mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                            >
                                <FiPlus size={16} />Add
                            </button>
                        )
                    }
                    {
                        (connectionStatus === 'connected') && (
                            <button
                                onClick={() => handleRemoveConnection(user._id)}
                                className='w-full mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                            >
                                Remove
                            </button>
                        )
                    }
                    {
                        (connectionStatus === 'request_sent') && (
                            <button
                                onClick={() => handleDeleteConnectionRequest('delete', user._id)}
                                className='w-full mt-1 text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                            >
                                Cancel
                            </button>
                        )
                    }
                    {
                        (connectionStatus === 'request_received') && (
                            <div className=' flex gap-2 justify-between mt-1 w-full'>
                                <button
                                    onClick={() => handleAcceptConnectionRequest(user._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 bg-gray-600 text-white hover:bg-gray-500 flex gap-1 justify-center items-center font-bold'
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleDeleteConnectionRequest('reject', user._id)}
                                    className='w-full text-sm py-1 px-3 rounded-lg border border-gray-600 hover:border-black hover:bg-gray-200 flex gap-1 justify-center items-center font-bold'
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default UserConnectionCard;
