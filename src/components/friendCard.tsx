import Dot from "../icons/Dot";
import Hamster from "../icons/Hamster";
import { dollarCoin } from "../images";
import formatCardPrice from "../utils/formatCardPrice";
import formatProfitPerHour from "../utils/formatProfitPerHour";
import { FriendTypes } from "../utils/types";

// interface FriendCardProps {
//   name: string;
//   level?: string;
//   points: number;
//   profitPerHour: number;
//   hasTelgramPremium?: boolean;
// }
const FriendCard: React.FC<FriendTypes> = (props) => {
  return (
    <div className="text-end col-span-1 bg-gray-700 p-4 w-11/12 overflow-clip mx-auto rounded-2xl flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="p- rounded-lg bg-[#1d2025] ">
          <Hamster size={42} className="text-[#d4d4d4] p-1" />
        </div>
        <div>
          <div className="text-sm flex flex-col gap-1 items-start">
            <span className="capitalize">{props.name} </span>
            <div className="text-xs flex items-center justify-evenly max-w-15">
              <span>{props.level}</span>
              <Dot className="p-0 -mx-1" />
              <span className="flex gap-1 mx-1">
                <img src={dollarCoin} className="h-4 w-4" alt="" />
                <span>{formatCardPrice(props.points)} </span>
              </span>
              <span className="text-gray-500"> ({formatProfitPerHour(props.profitPerHour)})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center justify-evenly w-2/12 ">
        <img src={dollarCoin} alt="" className="h-7 w-7" />
        <h1 className="text-base text-white font-bold">
          {props.hasTelgramPremium ? "+25k" : "+5K"}
        </h1>
      </div>
    </div>
  );
};

export default FriendCard;
