import React from "react";
import { dollarCoin } from "../images";



const HamsterCard: React.FC = () => {
  return (
    <div className="w-[95%] rounded-xl my-4 mx-auto flex flex-col text-nowrap bg-gray-600 p-1  text-center col-span-1">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-10/12 mt-6 rounded-lg h-24 mx-auto"
          src="https://v1.tailwindcss.com/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="mx-auto py-4 text-center flex flex-col items-center gap-2">
          <p className="font-bold text-xs mb-2">The Coldest Sunset</p>
          <p className="text-slate-400 text-xs font-extrabold text-wrap">
            Lorem ipsum dolor
          </p>
          <p className="text-slate-400 text-xs flex items-center gap-2">
            Profit per hour{" "}
            <span className="flex items-center">
              {" "}
              <img
                src={dollarCoin}
                alt="Dollar Coin"
                className="w-[18px] h-[18px]"
              />
              +4.3k
            </span>
          </p>
        </div>
        <hr className="opacity-25" />
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <span>lvl 13</span>
          <hr className="rotate-90" />
          <span className="flex items-center">
            {" "}
            <img
              src={dollarCoin}
              alt="Dollar Coin"
              className="w-[18px] h-[18px]"
            />
            151.3k
          </span>
        </div>
      </div>
    </div>
  );
};

export default HamsterCard;
