import React, { useState, useEffect } from "react";
import { dollarCoin } from "../images";
import Reload from "../icons/Reload";
import { Show } from "../utils/reactComponents";
import FriendCard from "../components/friendCard";
import { getUserFriends } from "../server/Api";
import useUserStore from "../store/userStore";
import { FriendTypes } from "../utils/types";
// import WebApp from "@twa-dev/sdk";
const Friends: React.FC = () => {
  const { telegramId } = useUserStore();
  const [friends, setFriends] = useState<FriendTypes[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const get = async () => {
      try {
        const data = await getUserFriends("7480308778");
        setFriends(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch friends.");
        setLoading(false);
      }
    };
    get();
  }, [telegramId, loading]);
  // const Friends = [
  //   {
  //     name: "Padonu Israel",
  //     level: "Silver",
  //     points: 2000000,
  //     profitPerHour: 121600,
  //     hasTelgramPremium: false,
  //   },

  // ];
  return (
    <div className="bg-black  flex justify-center h-screen min-h-screen overflow-y-scroll pb-[25vh]">
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
            <span>List of your friends ({friends?.length})</span>
            <button onClick={() => setLoading(true)}>
              <Reload className="text-white" />
            </button>
          </div>

          <div className="w-full">
            <Show
              when={friends?.length != 0 && !loading}
              fallback={
                <div className="text-center bg-gray-700 p-8 text-gray-500 w-11/12 mx-auto rounded-lg">
                  <Show
                    when={loading}
                    fallback={<p> You have not invited anyone</p>}
                  >
                    <p>Loading friends...</p>
                  </Show>{" "}
                  <Show when={error}>
                    <p>{error}</p>
                  </Show>
                </div>
              }
            >
              <div className="gap-2 grid grid-cols-1">
                {friends?.map((friend, index) => (
                  <div key={index}>
                    <FriendCard
                      name={friend.username || "?"}
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
