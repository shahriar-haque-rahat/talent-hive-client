'use client'

import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import SentRequest from '../sent-request/SentRequest';
import ReceivedRequest from '../received-request/ReceivedRequest';

const SentReceivedRequestModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'sent' | 'received' | null>(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            const target = event.target.closest('[data-type]');
            if (target) {
                const requestType = target.getAttribute('data-type');
                if (requestType === 'received-requests') {
                    setActiveTab('received');
                } else if (requestType === 'sent-requests') {
                    setActiveTab('sent');
                }
                setIsModalOpen(true);
            }
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
        setActiveTab(null);
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
                    <div className="bg-white w-full md:max-w-[50%] h-[70vh] p-6 rounded-lg relative overflow-hidden flex flex-col">
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">
                                {activeTab === 'sent' ? 'Sent Requests' : 'Received Requests'}
                            </h2>
                        </div>

                        {/* Content area for scrolling */}
                        <div className="flex-grow overflow-auto">
                            {activeTab === 'sent' ? <SentRequest /> : <ReceivedRequest />}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SentReceivedRequestModal;
