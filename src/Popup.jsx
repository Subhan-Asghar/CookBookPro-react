import React from 'react';

const Popup = ({ isOpen, onClose, instructions, youtube }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:h-auto md:w-3/5 sm:w-auto sm:h-auto ">
        <h4 className="text-xl font-semibold mb-4 text-center">Recipe Instructions</h4>
        <p className="text-gray-700 mb-4 sm:text-xs md:text-base">{instructions}</p>
        <div className='flex justify-center gap-3'>
          <button
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 inline-flex items-center"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
