import React from 'react';
import { MdClose } from 'react-icons/md';

const DiscardModal = ({ isOpen, onClose, onDiscard }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
            <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <MdClose size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Discard Post?</h2>
                <p className="mb-4">You have unsaved changes. Are you sure you want to discard this post?</p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDiscard}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscardModal;
