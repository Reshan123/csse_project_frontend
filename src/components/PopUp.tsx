import React from "react";

interface PopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const PopUp: React.FC<PopupProps> = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 rounded-lg shadow-lg w-2/3 relative">
        {/* Center the button horizontally */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

        {/* Make the content scrollable but hide the scrollbar */}
        <div className="overflow-y-auto max-h-[90vh] w-full p-10 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
