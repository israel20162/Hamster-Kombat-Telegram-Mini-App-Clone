import React from "react";
import Mine from "../icons/Mine";
import Friends from "../icons/Friends";
import Coins from "../icons/Coins";
import { binanceLogo, hamsterCoin } from "../images";
import { Show } from "../utils/reactComponents";
import { BOT_USERNAME } from "../server/variables";
import { useTelegram } from "../hooks/useTelegram";

interface FooterProps {
  setpage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { user, WebApp } = useTelegram();
  return (
    <div className="fixed bottom-0 left-0 w-full ">
      <Show when={props.page == "Friends"}>
        <div
          onClick={() => {
            WebApp.openTelegramLink(
              `https://t.me/share/url?url=http://t.me/${BOT_USERNAME}?start=fren=${user?.id}`
            );
          }}
          className="flex items-center text-white mb-2 mx-2 gap-2"
        >
          <button className="bg-blue-500 p-4 w-9/12 rounded-lg">
            invite friends
          </button>
          <button className="bg-blue-500 p-4 w-3/12 rounded-md">copy</button>
        </div>
      </Show>
      <div className="    max-w-xl bg-[#272a2f] flex mx-auto justify-around items-center z-40 rounded-3x text-xs">
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
        <div
          onClick={() => props.setpage("Friends")}
          className={`text-center text-[#85827d] p-2  m-1 w-1/5 ${
            props.page == "Friends" && "bg-[#1c1f24]   rounded-2xl"
          }`}
        >
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
        <div
          onClick={() => props.setpage("Earn")}
          className={`text-center text-[#85827d] p-2  m-1 w-1/5 ${
            props.page == "Earn" && "bg-[#1c1f24]   rounded-2xl"
          }`}
        >
          <Coins className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p>
        </div>
        <div className="text-center text-[#85827d] w-1/5">
          <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Airdrop</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
