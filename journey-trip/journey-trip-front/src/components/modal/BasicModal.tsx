import React from 'react';
import { ModalProps } from '@/interfaces';

const BasicModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default BasicModal;