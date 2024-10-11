import React, { useState } from "react";
import Fire from "../icons/Fire";
import Lightning from "../icons/Lightning";
import Hand from "../icons/Hand";
import Battery from "../icons/Battery";
import Recharge from "../icons/Recharge";
import useUserStore from "../store/userStore";
import { dollarCoin } from "../images";
import CardModal from "../components/cardModal";
import { CardTypes } from "../utils/types";
interface BoostsProps {
  points: number | string;
}



const Boosts: React.FC<BoostsProps> = () => {
  const [currentCardInView, setCurrentCardInView] = useState<CardTypes>({
    title: "",
    description: "",
    image: Fire,
    profitPerHour: 0,
    level: 0,
    price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stat, setStat] = useState("");
  const {
    points,
    upgradeLevelClick,
    upgradeStats,
    getUpgradeCost,
    upgradeLevelEnergy,
    upgradeLevelRecharge,
  } = useUserStore();

  const Boosts = [
    {
      title: "Multitap",
      description: "The number of points added per click",
      image: Hand,
      profitPerHour: 0,
      level: upgradeLevelClick,
      price: getUpgradeCost(upgradeLevelClick),
    },
    {
      title: "Energy Limit",
      description: "The limit of your energy",
      image: Battery,
      profitPerHour: 0,
      level: upgradeLevelEnergy,
      price: getUpgradeCost(upgradeLevelEnergy),
    },
    {
      title: "Recharge Speed",
      description: "How fast your energy recharges",
      image: Recharge,
      profitPerHour: 0,
      level: upgradeLevelRecharge,
      price: getUpgradeCost(upgradeLevelRecharge),
    },
  ];
  return (
    <div className="overflow-auto text-white font-sans">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <i className="fas fa-cloud text-white" />
          <span className="text-lg font-bold">Knight Coin</span>
          <i className="fas fa-check-circle text-blue-500" />
        </div>
        <i className="fas fa-bars" />
      </header>
      {/* Share Balance */}
      <section className="text-center mt-6">
        <p className="text-sm">Your Share Balance</p>
        <h1 className="text-5xl font-bold mt-1">{points.toLocaleString()}</h1>
      </section>
      {/* Daily Boosters */}
      <section className="mt-8 px-4">
        <p className="text-lg font-semibold">Your daily boosters:</p>
        <div className="flex justify-between items-center gap-4 mt-4  py-3 px-2 rounded-lg">
          <div className="flex items-center whitespace-nowrap space-x-2 bg-gray-900/30  p-4 w-1/2">
            <Fire className="w-6 h-6" />
            <div>
              <p>Tapping Guru</p>
              <p className="text-sm">3/3</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-900/30 p-4 w-1/2">
            <Lightning />
            <div>
              <p>Full Tank</p>
              <p className="text-sm">3/3</p>
            </div>
          </div>
        </div>
      </section>
      {/* Boosters List */}
      <section className="mt-6 px-4">
        <p className="text-lg font-semibold">Boosters:</p>
        {Boosts.map((boost, index) => (
          <div
            key={index}
            onClick={() => {
              setIsModalOpen(true);
              setCurrentCardInView(boost);
              setStat(boost.title);
            }}
            className="mt-4 bg-gray-900/30 py-3 px-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center space-x-2">
              {<boost.image />}
              <div>
                <p>{boost.title}</p>
                <p className="text-sm text-gray-300 flex w-full gap-1">
                  <img src={dollarCoin} className="h-4 w-4" alt="" />{" "}
                  {boost.price} | level {boost.level}
                </p>
              </div>
            </div>
            <i className="fas fa-chevron-right" />
          </div>
        ))}
        {/* Booster Items */}

        <div className="mt-4 bg-gray-900/30 py-3 px-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-dice text-blue-400" />
            <div>
              <p>Tap Bot</p>
              <p className="text-sm text-gray-300">20,000</p>
            </div>
          </div>
          <i className="fas fa-chevron-right" />
        </div>
      </section>

      <CardModal
        isOpen={isModalOpen}
        isBoost={true}
        onClose={() => {
          setIsModalOpen((prev) => !prev);
          upgradeStats(currentCardInView.price, stat);
        }}
        cardDetails={currentCardInView}
      />
    </div>
  );
};

export default Boosts;
