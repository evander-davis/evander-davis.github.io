
import React from 'react';
import { UI_COLORS } from '../constants';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  // Prevent closing when clicking inside the modal content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm`}
      onClick={onClose} // Close when clicking overlay
    >
      <div
        className={`bg-[${UI_COLORS.panelBg}] rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border-2 border-[${UI_COLORS.border}] glowing-border`}
        onClick={handleContentClick}
      >
        <div className={`px-6 py-4 border-b border-[${UI_COLORS.border}]`}>
          <h2 className={`text-2xl font-bold text-[${UI_COLORS.accent}] text-shadow-cyan`}>{title}</h2>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        <div className={`px-6 py-4 border-t border-[${UI_COLORS.border}] flex justify-end`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 bg-[${UI_COLORS.accent}] text-[${UI_COLORS.darkBg}] font-semibold rounded hover:bg-opacity-80 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[${UI_COLORS.accent}] focus:ring-offset-2 focus:ring-offset-[${UI_COLORS.panelBg}]`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
