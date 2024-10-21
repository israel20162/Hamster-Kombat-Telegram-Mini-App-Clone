import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { dollarCoin } from "../images";

interface ModalProps {
  isOpen?: boolean;
  setIsModalOpen?: () => void;
  onClose?: () => void;
}
const OfflineProfitPerHour: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  setIsModalOpen,
}) => {
  const {lastOnline,profitPerHour} = useUserStore();
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    if (lastOnline) {
      const currentTime = new Date();
      const offlineDurationMs =
        currentTime.getTime() - new Date(lastOnline).getTime();
      const offlineDurationHours = Math.min(
        offlineDurationMs / (1000 * 60 * 60),
        3
      ); // Cap at 3 hours

    
      const points = offlineDurationHours * profitPerHour;
      setPointsEarned(Math.round(points));
    }
  }, [lastOnline]);
  return (
    <div className="relative">
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-gradient-to-b from-gray-700 to-orange-500 backdrop-blur-sm transition-opacity duration-100 ease-in-out ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={setIsModalOpen}
        ></div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-x-0 bottom-0 z-50 w-full  max-h-[50vh] py-10  bg-black text-white p-6 rounded-t-[46px] shadow-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h1 className="text-lg font-bold capitalize">Welcome back!</h1>
        <div className="px-4  flex justify-center bg-slate-900 bg-opacity-30 p-8 rounded">
          <div className="px-4  flex items-center gap-2 space-x-2">
            {/* <img src={dollarCoin} alt="Dollar Coin" className="w-8 h-8" /> */}
            <p className="flex flex-col items-center gap-4 text-xl">
              <span className="px-4 flex gap-2 text-[3rem] justify-center items-center">
                <img
                  src={dollarCoin}
                  alt="Dollar Coin"
                  className="w-12 h-12 object-contain"
                />
                {pointsEarned}
              </span>
              You earned while offline.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-6 w-full bg-blue-800 font-semibold text-xl rounded-xl hover:bg-blue-600 "
        >
          Thank You, <span className="text-cyan-700"> Exchange</span>
        </button>
      </div>
    </div>
  );
};

export default OfflineProfitPerHour;
