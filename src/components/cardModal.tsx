import React, { useEffect } from "react";
import { dollarCoin } from "../images";
import formatProfitPerHour from "../utils/formatProfitPerHour";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CardModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      // Add class to body to disable scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // Remove class when modal is closed
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-gradient-to-b from-gray-700 to-orange-500 backdrop-blur-sm transition-opacity duration-100 ease-in-out ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={onClose}
        ></div>
      )}

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-x-0 bottom-0 z-50 w-full max-h-1/2   bg-black text-white p-6 rounded-t-[46px] shadow-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col justify-center text-center gap-1">
          <img
            className="w-6/12  rounded-lg h-24  mx-auto object-contain mb-2"
            src={dollarCoin}
            alt="Sunset in the mountains"
          />
          <h2 className="text-lg font-semibold">Dollar Coin</h2>
          <span className="mt-1 text-xs  w-2/3 mx-auto">
            Most traded cryptocurrency pairs market capitalization
          </span>
          {/* text-xxs is a css class for smaller text */}
          <div className="flex flex-col  rounded-lg text-xxs px-4 py-2 mx-auto justify-between items-center">
            <span className="text-slate-300">Profit per Hour</span>
            <span className="flex items-center gap-1">
              {" "}
              <img
                src={dollarCoin}
                alt="Dollar Coin"
                className="w-[18px] h-[18px]"
              />
              {"  "}
              {formatProfitPerHour(3500)}
            </span>
          </div>
          <div className="px-4  flex justify-center">
            <div className="px-4  flex items-center gap-2 space-x-2">
              <img src={dollarCoin} alt="Dollar Coin" className="w-8 h-8" />
              <p className="text-3xl text-white">{"123,345"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-6 p-4 w-full bg-blue-500  rounded-xl hover:bg-blue-600 "
          >
            Go ahead
          </button>
        </div>
      </div>
    </>
  );
};

export default CardModal;
