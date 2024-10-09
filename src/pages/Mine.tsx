import React, { useState, useEffect } from "react";
import {
  armyHamster,
  binanceLogo,
  boardHamster,
  dailyCipher,
  dollarCoin,
  legalHamster,
  mainCharacter,
  officeHamster,
  pepe,
} from "../images";
import formatProfitPerHour from "../utils/formatProfitPerHour";
import calculateTimeLeft from "../utils/calculateTimeLeft";
import { Switch, Match } from "../utils/reactComponents";
import Markets from "./Mine/Markets";
import PR from "./Mine/Pr&Team";
import Legal from "./Mine/Legal";
import Specials from "./Mine/Specials";
import CardModal from "../components/cardModal";
import { CardTypes } from "../utils/types";
import useUserStore from "../store/userStore";

interface Props {
  points: number;
  coins: number;
  coinsToLevelUp: number;
  profitPerHour: number;
  pointsToAdd: number;
}

const Mine: React.FC<Props> = (props) => {
  //  const [points, setPoints] = useState(useUserStore((state) => state.points));
  const { updatePoints ,points} = useUserStore();
  const profitPerHour = props.profitPerHour;
  const pointsToAdd = props.pointsToAdd;
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");
  const [tab, setTab] = useState("Markets");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardInView, setCurrentCardInView] = useState<CardTypes>({
    title: "",
    description: "",
    image: "",
    profitPerHour: 0,
    level: 0,
    price: 0,
  });
  useEffect(() => {
  
    const updateCountdowns = () => {
        const pointsPerSecond = Math.floor(70000 / 3600);
      // const pointsPerSecond = Math.floor(profitPerHour / 3600);
     
      updatePoints(points + pointsPerSecond);
      //  setPoints((prev) => prev + pointsPerSecond);
      setDailyComboTimeLeft(calculateTimeLeft(12, true));
    };

     updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000); // Update every minute

    return () => clearInterval(interval);
  }, [dailyComboTimeLeft]);

  const MarketCards = [
    {
      title: "binance",
      description: "Lord binance",
      image: binanceLogo,
      profitPerHour: 1000,
      level: 1,
      price: 4000,
    },
    {
      title: "BTC",
      description: "Lord Btc",
      image: dollarCoin,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "Code lock",
      description: "Lord Cipher",
      image: dailyCipher,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "hamster",
      description: "Lord hamster",
      image: mainCharacter,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "hamster",
      description: "Lord hamster",
      image: mainCharacter,
      profitPerHour: 3800,
      level: 1,
      price: 10800,
    },
  ];
  const PRCards = [
    {
      title: "Office hamster",
      description: "Office",
      image: officeHamster,
      profitPerHour: 1000,
      level: 1,
      price: 4000,
    },
    {
      title: "Meme Coin",
      description: "Develop meme coin team",
      image: pepe,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "Protector hamster",
      description: "Protect against attacks",
      image: armyHamster,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "hamster",
      description: "Lord hamster",
      image: boardHamster,
      profitPerHour: 3800,
      level: 1,
      price: 3800,
    },
    {
      title: "hamster",
      description: "Lord hamster",
      image: legalHamster,
      profitPerHour: 3800,
      level: 1,
      price: 10800,
    },
    {
      title: "hamster",
      description: "Lord hamster",
      image: legalHamster,
      profitPerHour: 3800,
      level: 1,
      price: 10800,
    },
  ];
  return (
    <>
      <div className="bg-black flex justify-center  ">
        <div className="w-full mx-auto bg-black text-white h-screen  max-h-screen overflow-scroll font-bold flex flex-col max-w-xl">
          <div className="flex-grow   mt-20 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0 ">
            <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] overflow-scroll  h-screen rounded-t-[46px]">
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
                    <p className="text-4xl text-white">{points}</p>
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
                      <li
                        className="z-30 flex-auto text-center"
                        onClick={() => setTab("Markets")}
                      >
                        <a
                          className={`z-30 flex items-center justify-center w-full  text-sm mb-0 border-0 rounded-md cursor-pointer p-2  ${
                            tab == "Markets" && "bg-black/10"
                          }`}
                          role="tab"
                        >
                          Markets
                        </a>
                      </li>
                      <li
                        className="z-30 flex-auto text-center"
                        onClick={() => setTab("PR&Team")}
                      >
                        <a
                          className={`z-30 flex items-center justify-center w-full  text-sm mb-0 border-0 rounded-md cursor-pointer p-2  ${
                            tab == "PR&Team" && "bg-black/10"
                          }`}
                          data-tab-target
                          role="tab"
                          aria-selected="false"
                        >
                          PR&Team
                        </a>
                      </li>
                      <li
                        className="z-30 flex-auto text-center"
                        onClick={() => setTab("Legal")}
                      >
                        <a
                          className={`z-30 flex items-center justify-center w-full  text-sm mb-0 border-0 rounded-md cursor-pointer p-2  ${
                            tab == "Legal" && "bg-black/10"
                          }`}
                          data-tab-target
                          role="tab"
                          aria-selected="false"
                        >
                          Legal
                        </a>
                      </li>
                      <li
                        className="z-30 flex-auto text-center"
                        onClick={() => setTab("Specials")}
                      >
                        <a
                          className={`z-30 flex items-center justify-center w-full  text-sm mb-0 border-0 rounded-md cursor-pointer p-2  ${
                            tab == "Specials" && "bg-black/10"
                          }`}
                          data-tab-target
                          role="tab"
                        >
                          Specials
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <Switch fallback={<p>A fallback</p>}>
                  <Match when={tab == "Markets"}>
                    <Markets
                      onClick={(card) => {
                        setIsModalOpen((prev) => !prev);
                        setCurrentCardInView(card);
                      }}
                      isOpen={isModalOpen}
                      cards={MarketCards}
                    />
                  </Match>

                  <Match when={tab == "PR&Team"}>
                    <PR
                      onClick={(card) => {
                        setIsModalOpen((prev) => !prev);
                        setCurrentCardInView(card);
                      }}
                      isOpen={isModalOpen}
                      cards={PRCards}
                    />
                  </Match>

                  <Match when={tab == "Legal"}>
                    <Legal
                      onClick={(card) => {
                        setIsModalOpen((prev) => !prev);
                        setCurrentCardInView(card);
                      }}
                      isOpen={isModalOpen}
                      cards={PRCards}
                    />
                  </Match>
                  <Match when={tab == "Specials"}>
                    <Specials
                      onClick={(card) => {
                        setIsModalOpen((prev) => !prev);
                        setCurrentCardInView(card);
                      }}
                      isOpen={isModalOpen}
                      cards={MarketCards}
                    />
                  </Match>
                </Switch>
              </section>
            </div>
          </div>
        </div>
      </div>
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen((prev) => !prev);
        }}
        cardDetails={currentCardInView}
      />
    </>
  );
};

export default Mine;
