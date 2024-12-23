import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Children content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
