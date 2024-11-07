import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) => {
    if (!isOpen) return null;

    return (
        <>
            <Modal
                size='5xl'
                isOpen={isOpen}
                onOpenChange={onClose}
                className='bg-white w-11/12 max-w-md p-6 rounded-lg '
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{title}</ModalHeader>
                            <ModalBody>
                                <div className="relative">
                                    <p className="mb-4">{message}</p>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={onClose}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                        >
                                            {cancelLabel}
                                        </button>
                                        <button
                                            onClick={onConfirm}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            {confirmLabel}
                                        </button>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
