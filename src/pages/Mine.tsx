import React, { useState, useEffect } from "react";
import { dollarCoin } from "../images";
import formatProfitPerHour from "../utils/formatProfitPerHour";
import calculateTimeLeft from "../utils/calculateTimeLeft";
import HamsterCard from "../components/hamsterCard";
interface Props {
  points: number;
  coins: number;
  coinsToLevelUp: number;
  profitPerHour: number;
  pointsToAdd: number;
}

const Mine: React.FC<Props> = (props) => {
  const points = props.points;
  const profitPerHour = props.profitPerHour;
  const pointsToAdd = props.pointsToAdd;
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");
  useEffect(() => {
    const updateCountdowns = () => {
      setDailyComboTimeLeft(calculateTimeLeft(12, true));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000); // Update every minute

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="bg-black flex justify-center max-h-screen overflow-scroll ">
        <div className="w-full mx-auto bg-black text-white h-screen  max-h-screen overflow-scroll font-bold flex flex-col max-w-xl">
          <div className="flex-grow   mt-20 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0 ">
            <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025]  max-h-screen  rounded-t-[46px]">
              <section className="flex justify-evenly   !text-nowrap mx-auto my-8 gap-1">
                <div className="flex flex-col   bg-gray-700 rounded-lg text-xs gap-1 px-4 py-2 mx-auto justify-between items-center">
                  <span className="text-[#f3ba2f] mb-2">Earn per tap</span>
                  <span className="flex justify-center items-center gap-1">
                    {" "}
                    <img
                      src={dollarCoin}
                      alt="Dollar Coin"
                      className="w-[18px] h-[18px]"
                    />
                    +{pointsToAdd}
                  </span>
                </div>

                <div className="flex flex-col  bg-gray-700 rounded-lg text-xs px-4 py-2 mx-auto justify-between items-center">
                  <span className="text-blue-500 ">Coins to level up</span>
                  <span>10 M</span>
                </div>
                <div className="flex flex-col  bg-gray-700 rounded-lg text-xs px-4 py-2 mx-auto justify-between items-center">
                  <span className="text-green-500">Profit per Hour</span>
                  <span className="flex items-center">
                    {" "}
                    <img
                      src={dollarCoin}
                      alt="Dollar Coin"
                      className="w-[18px] h-[18px]"
                    />
                    {"  "}
                    {formatProfitPerHour(profitPerHour)}
                  </span>
                </div>
              </section>
              <section className="flex items-center flex-col gap-4">
                <div className="px-4 mt-4 flex justify-center">
                  <div className="px-4 py-2 flex items-center space-x-2">
                    <img
                      src={dollarCoin}
                      alt="Dollar Coin"
                      className="w-10 h-10"
                    />
                    <p className="text-4xl text-white">
                      {points.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] w-full px-8 font-medium text-end text-gray-500 mt-2">
                  {dailyComboTimeLeft}
                </p>

                <div className="flex w-11/12 mx-auto px-4 py-2 justify-between items-center bg-gray-700 rounded-lg">
                  <span className="text-xs">Daily Combo</span>
                  <span className="bg-gray-800 flex items-center text-xs py-2 px-4 justify-evenly gap-1 rounded-lg">
                    <img
                      src={dollarCoin}
                      alt="Dollar Coin"
                      className="w-[18px] h-[18px]"
                    />
                    <p className=" text-white">+5,000,000</p>
                  </span>
                </div>
              </section>
              <section className="mt-4">
                <div className="w-11/12 mx-auto ">
                  <div className="relative right-0">
                    <ul
                      className="relative flex flex-wrap items-center px-1.5 py-3 list-none rounded-lg bg-gray-700"
                      role="list"
                    >
                      <li className="z-30 flex-auto text-center">
                        <a
                          className="z-30 flex items-center justify-center w-full  text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer   bg-black/10 p-4"
                          role="tab"
                        >
                          Markets
                        </a>
                      </li>
                      <li className="z-30 flex-auto text-center">
                        <a
                          className="z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer  bg-inherit"
                          data-tab-target
                          role="tab"
                          aria-selected="false"
                        >
                          PR&Team
                        </a>
                      </li>
                      <li className="z-30 flex-auto text-center">
                        <a
                          className="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer bg-inherit"
                          data-tab-target
                          role="tab"
                          aria-selected="false"
                        >
                          Legal
                        </a>
                      </li>
                      <li className="z-30 flex-auto text-center">
                        <a
                          className="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer bg-inherit"
                          data-tab-target
                          role="tab"
                          aria-selected="false"
                        >
                          Specials
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="grid grid-cols-2 w-[95%] mx-auto ">
                <HamsterCard />
                <HamsterCard />
                <HamsterCard />
                <HamsterCard />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mine;
