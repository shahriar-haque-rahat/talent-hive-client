import React from 'react';
import Connection from './connection/Connection';
import { RiUserReceived2Line, RiUserShared2Line } from "react-icons/ri";
import SentReceivedRequestModal from './my-connections-shared-component/SentReceivedRequestModal';
import Link from 'next/link';
import UserProfileSearch from '../shared/searching-components/UserProfileSearch';

const MyConnections = () => {
    return (
        <>
            <h1 className='mb-4 text-2xl font-semibold px-6 py-8 bg-white rounded-lg shadow border'>My Connections</h1>

            <div className='mb-4 md:w-1/2'><UserProfileSearch/></div>

            <div className="flex flex-col md:flex-row gap-2 justify-between">
                <Link href={"/connection-recommendations"}>
                    <div
                        className='w-fit text-xs border border-black bg-gray-700 text-white py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-500'
                    >
                        <p>Connection Recommendations</p>
                    </div>
                </Link>

                <div className='w-fit flex gap-2 items-center'>
                    <div
                        className='flex gap-2 items-center text-xs border border-black py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-300'
                        data-type="received-requests"
                    >
                        <RiUserReceived2Line />
                        <p>Received Requests</p>
                    </div>
                    <div
                        className='flex gap-2 items-center text-xs border border-black py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-300'
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
