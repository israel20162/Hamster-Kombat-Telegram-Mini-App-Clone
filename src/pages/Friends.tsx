import React from "react";
import { dollarCoin } from "../images";
import Reload from "../icons/Reload";
import { Show } from "../utils/reactComponents";
import FriendCard from "../components/friendCard";
// import WebApp from "@twa-dev/sdk";
const Friends: React.FC = () => {
  const Friends = [
    {
      name: "Padonu Israel",
      level: "Silver",
      points: 2000000,
      profitPerHour: 121600,
      hasTelgramPremium: false,
    },
    {
      name: "David Israel",
      level: "Gold",
      points: 200000,
      profitPerHour: 12100,
      hasTelgramPremium: false,
    },
    {
      name: "Padonu Israel",
      level: "Epic",
      points: 70000000,
      profitPerHour: 11600,
      hasTelgramPremium: false,
    },
    {
      name: "Padonu Elizabeth",
      level: "Legendary",
      points: 2000000,
      profitPerHour: 12160,
      hasTelgramPremium: false,
    },
    {
      name: "Padonu Israel",
      level: "Silver",
      points: 2000000,
      profitPerHour: 121600,
      hasTelgramPremium: true,
    },
    {
      name: "David Israel",
      level: "Gold",
      points: 900000,
      profitPerHour: 12100,
      hasTelgramPremium: false,
    },
    {
      name: "Padonu Israel",
      level: "Epic",
      points: 70000000,
      profitPerHour: 11600,
      hasTelgramPremium: false,
    },
    {
      name: "Padonu Elizabeth",
      level: "Legendary",
      points: 2000000,
      profitPerHour: 12160,
      hasTelgramPremium: true,
    },
  ];
  return (
    <div className="bg-black  flex justify-center ">
      <div className="w-full  mx-auto bg-black text-white h-screen max-h-screen overflow-scroll font-bold flex flex-col  gap-4">
        <section className="text-center w-full mx-auto pt-16 flex flex-col gap-4">
          <h1 className="text-3xl"> Invite Friends!</h1>
          <h2 className="text-slate-200">
            You and your friend will receive bonuses
          </h2>
        </section>
        <section className="mt-8 space-y-2 mx-auto">
          <div className="w-11/12 mx-auto rounded-3xl  bg-gray-700 flex items-center p-2">
            <div className="w-1/4 mx-auto ">
              <img
                src={dollarCoin}
                alt=""
                className="object-contain w-16 h-24"
              />
            </div>
            <div className="w-3/4 mx-auto flex flex-col h-full gap-6 text-left">
              <h2 className="text-white">Invite a Friend</h2>
              <p className="flex items-center gap-1">
                <img src={dollarCoin} className="h-[12px] w-[12px]" alt="" />
                <span className="text-sm">
                  {" "}
                  <span className="text-[#f3ba2f]">+5,000</span> for you and
                  your friend
                </span>
              </p>
            </div>
          </div>
          <div className="w-11/12 mx-auto rounded-3xl  bg-gray-700 flex items-center p-2">
            <div className="w-1/4 mx-auto ">
              <img
                src={dollarCoin}
                alt=""
                className="object-contain w-16 h-24"
              />
            </div>
            <div className="w-3/4 mx-auto flex flex-col h-full gap-6 text-left">
              <h2 className="text-white">
                Invite a Friend with telegram premium
              </h2>
              <p className="flex items-center gap-1">
                <img src={dollarCoin} className="h-[12px] w-[12px]" alt="" />
                <span className="text-sm">
                  {" "}
                  <span className="text-[#f3ba2f]">+25,000</span> for you and
                  your friend
                </span>
              </p>
            </div>
          </div>
        </section>
        <div className="text-center my-5 text-xl w-full text-indigo-700">
          <a href="">More bonuses</a>
        </div>
        <section className="text-center w-full mx-auto  flex flex-col gap-4 relative">
          <div className="justify-between flex w-full items-center px-5">
            <span>List of your friends (0)</span>
            <button>
              <Reload className="text-white" />
            </button>
          </div>

          <div className="w-full">
            <Show
              when={true}
              fallback={
                <div className="text-center bg-gray-700 p-8 text-gray-500 w-11/12 mx-auto rounded-lg">
                  You have not invited anyone
                </div>
              }
            >
              <div className="gap-2 grid grid-cols-1">
                {Friends.map((friend, index) => (
                  <div key={index}>
                    <FriendCard
                      name={friend.name}
                      points={friend.points}
                      profitPerHour={friend.profitPerHour}
                      level={friend.level}
                      hasTelgramPremium={friend.hasTelgramPremium}
                    />
                  </div>
                ))}
              </div>
            </Show>
          </div>
         
        </section>
      </div>
    </div>
  );
};

export default Friends;
