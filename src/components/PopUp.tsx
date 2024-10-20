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
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Close
        </button>

        {/* Render the passed component */}
        {children}
      </div>
    </div>
  );
};

export default PopUp;
