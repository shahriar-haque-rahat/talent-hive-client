import React from 'react';
import Connection from './connection/Connection';
import { RiUserReceived2Line, RiUserShared2Line } from "react-icons/ri";
import SentReceivedRequestModal from './my-connections-shared-component/SentReceivedRequestModal';

const MyConnections = () => {
    return (
        <>
            <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>My Connections</h1>

            <div className="flex justify-center md:justify-end">
                <div className='w-fit flex gap-2 items-center'>
                    <div
                        className='flex gap-2 items-center text-xs border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-300'
                        data-type="received-requests"
                    >
                        <RiUserReceived2Line />
                        <p>Received Requests</p>
                    </div>
                    <div
                        className='flex gap-2 items-center text-xs border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-300'
                        data-type="sent-requests"
                    >
                        <RiUserShared2Line />
                        <p>Sent Requests</p>
                    </div>
                </div>
            </div>

            <Connection />

            <SentReceivedRequestModal />
        </>
    );
};

export default MyConnections;
