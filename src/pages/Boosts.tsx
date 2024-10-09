import React from "react";
import Fire from "../icons/Fire";
import Lightning from "../icons/Lightning";
import Hand from "../icons/Hand";
interface BoostsProps {
  points: number | string;
}

const Boosts: React.FC<BoostsProps> = (props) => {
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
        <h1 className="text-5xl font-bold mt-1">
          {props.points.toLocaleString()}
        </h1>
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
        {/* Booster Items */}
        <div className="mt-4 bg-gray-900/30 py-3 px-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
           <Hand/>
            <div>
              <p>Multitap</p>
              <p className="text-sm text-gray-300">200 | 1 level</p>
            </div>
          </div>
          <i className="fas fa-chevron-right" />
        </div>
        <div className="mt-4 bg-gray-900/30 py-3 px-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-battery-half text-blue-400" />
            <div>
              <p>Energy Limit</p>
              <p className="text-sm text-gray-300">200 | 1 level</p>
            </div>
          </div>
          <i className="fas fa-chevron-right" />
        </div>
        <div className="mt-4 bg-gray-900/30 py-3 px-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-bolt text-yellow-400" />
            <div>
              <p>Recharging Speed</p>
              <p className="text-sm text-gray-300">200 | 1 level</p>
            </div>
          </div>
          <i className="fas fa-chevron-right" />
        </div>
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
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-purple-800 py-3 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <i className="fas fa-gift text-yellow-400" />
          <p className="text-sm">Ref</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-tasks text-gray-400" />
          <p className="text-sm">Task</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-hand-pointer text-yellow-400" />
          <p className="text-sm">Tap</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-bolt text-yellow-400" />
          <p className="text-sm">Boost</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-store text-gray-400" />
          <p className="text-sm">Store</p>
        </div>
      </nav>
    </div>
  );
};

export default Boosts;
