'use client'

import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import SentRequest from '../sent-request/SentRequest';
import ReceivedRequest from '../received-request/ReceivedRequest';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

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
                <>
                    <Modal
                        size='5xl'
                        isOpen={isModalOpen}
                        onOpenChange={handleClose}
                        className='bg-white w-full md:max-w-[50%] h-[70vh] p-6 rounded-lg'
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader>{activeTab === 'sent' ? 'Sent Requests' : 'Received Requests'}</ModalHeader>
                                    <ModalBody>
                                        <div className="overflow-hidden flex flex-col">
                                            {/* Content area for scrolling */}
                                            <div className="flex-grow overflow-auto">
                                                {activeTab === 'sent' ? <SentRequest /> : <ReceivedRequest />}
                                            </div>
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default SentReceivedRequestModal;
