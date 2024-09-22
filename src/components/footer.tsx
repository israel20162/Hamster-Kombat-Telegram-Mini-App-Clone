import React from "react";
import Mine from "../icons/Mine";
import Friends from "../icons/Friends";
import Coins from "../icons/Coins";
import { binanceLogo, hamsterCoin } from "../images";

interface FooterProps {
  setpage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="  max-w-xl bg-[#272a2f] flex mx-auto justify-around items-center z-50 rounded-3x text-xs">
      <div
        onClick={() => props.setpage("Exchange")}
        className={`text-center text-[#85827d] w-1/5 p-2 m-1 ${
          props.page == "Exchange" && "bg-[#1c1f24]   rounded-2xl"
        } `}
      >
        <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
        <p className="mt-1">Exchange</p>
      </div>
      <div
        onClick={() => props.setpage("Mine")}
        className={`text-center text-[#85827d] p-2  m-1 w-1/5 ${
          props.page == "Mine" && "bg-[#1c1f24]   rounded-2xl"
        }`}
      >
        <Mine className="w-8 h-8 mx-auto" />
        <p className="mt-1">Mine</p>
      </div>
      <div className="text-center text-[#85827d] w-1/5">
        <Friends className="w-8 h-8 mx-auto" />
        <p className="mt-1">Friends</p>
      </div>
      <div className="text-center text-[#85827d] w-1/5">
        <Coins className="w-8 h-8 mx-auto" />
        <p className="mt-1">Earn</p>
      </div>
      <div className="text-center text-[#85827d] w-1/5">
        <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
        <p className="mt-1">Airdrop</p>
      </div>
    </div>
  );
};
export default Footer;
