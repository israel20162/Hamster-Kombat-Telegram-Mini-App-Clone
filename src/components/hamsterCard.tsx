import React from "react";
import { dollarCoin } from "../images";
import formatProfitPerHour from "../utils/formatProfitPerHour";
import formatCardPrice from "../utils/formatCardPrice";
import { CardTypes } from "../utils/types";

interface HamsterCardProps {
  onClick: (card: CardTypes) => void;
  cardDeatails: {
    title: string;
    description: string;
    image: string;
    profitPerHour: number;
    level: number;
    price: number;
  };
}

const HamsterCard: React.FC<HamsterCardProps> = (props) => {
  const { title, description, image, profitPerHour, level, price } =
    props.cardDeatails;

  return (
    <div
      className="w-[95%] rounded-xl my-4 mx-auto flex flex-col text-nowrap bg-gray-600 p-1  text-center col-span-1"
      onClick={() => props.onClick(props.cardDeatails)}
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-11/12 mt-6 rounded-xl h-24 object-contain mx-auto "
          src={image}
          alt="Sunset in the mountains"
        />
        <div className="mx-auto py-4 text-center flex flex-col items-center gap-2">
          <p className="font-bold text-sm mb-2 capitalize">{title}</p>
          <p className="text-slate-200 text-xs font-bold text-wrap">
            {description}
          </p>
          {/* text-xxs is a css class for smaller text */}
          <p className="text-slate-200 text-xxs flex items-center gap-2">
            Profit per hour{" "}
            <span className="flex items-center gap-1 object-contain">
              <img
                src={dollarCoin}
                alt="Dollar Coin"
                className="w-[15px] h-[15px]"
              />
              {formatProfitPerHour(profitPerHour)}
            </span>
          </p>
        </div>
        <hr className="opacity-25" />
        <div className=" py-4 flex items-center justify-between  divide-solid divide-x divide-opacity-25 text-center ">
          <p className=" border-opacity-25 border-slate-300   w-1/3">
            lvl {level}
          </p>

          <p className="flex items-center justify-center gap-1 mx-auto w-2/3">
            <img
              src={dollarCoin}
              alt="Dollar Coin"
              className="w-[15px] h-[15px]"
            />
            <span> {formatCardPrice(price)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HamsterCard;
