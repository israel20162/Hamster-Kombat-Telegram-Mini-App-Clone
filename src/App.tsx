import React, { useContext, useEffect, useState } from "react";
import Exchange from "./pages/Exchange";
import Footer from "./components/footer";
import Mine from "./pages/Mine";
import Boosts from "./pages/Boosts";
import { Switch, Match } from "./utils/reactComponents";
import Friends from "./pages/Friends";
import Earn from "./pages/Earn";
import { useTelegram } from "./hooks/useTelegram";
import { createOrGetUser } from "./server/Api";
import useUserStore from "./store/userStore";
import { AppContext } from "./context/appContext";
import { AppContextTypes } from "./context/appContext";

const App: React.FC = () => {
  const { page, setPage } = useContext(AppContext) as AppContextTypes;
  const { user, WebApp } = useTelegram();
  const setUserData = useUserStore((state) => state.setInitialState);
  const [points, setPoints] = useState(useUserStore((state) => state.points));
  const {
    pointsPerClick,
    startAutoSave,
    profitPerHour,
   resetUser
  } = useUserStore();

  useEffect(() => {
    
    async function send() {
      const response = await createOrGetUser(user?.id);
      const data = await response?.json();
      setUserData(data.user);
      //   setPoints(data.user.points);
    }
    send();
    WebApp.ready();
  }, []);
 
  // Start autosave when the component mounts
  useEffect(() => {
    // startAutoSave();
    var set;
    clearInterval(set);
    set = setInterval(() => {
      startAutoSave();
    }, 60000);
    return () => {
      //  stopAutoSave(); // Stop autosave when the component unmounts
    };
  }, []);

  const pointsToAdd = pointsPerClick;

  return (
    <Switch fallback={<p>A fallback</p>}>
      <Match when={page == "Exchange"}>
        <div className="bg-black relative ">
          <Exchange
            points={points}
            pointsToAdd={pointsToAdd}
            setPoints={setPoints}
            profitPerHour={profitPerHour}
            user={user}
          />

          <Footer setpage={setPage} page={page} />
        </div>
      </Match>
      <Match when={page == "Mine"}>
        <div className="bg-black relative ">
          <Mine
            points={points}
            coinsToLevelUp={1}
            pointsToAdd={pointsToAdd}
            coins={1}
            profitPerHour={profitPerHour}
          />
          <Footer setpage={setPage} page={page} />
        </div>
      </Match>
      <Match when={page == "Friends"}>
        <div className="bg-black  ">
          <Friends />
          <Footer setpage={setPage} page={page} />
        </div>
      </Match>
      <Match when={page == "Earn"}>
        <div className="bg-black relative ">
          <Earn />
          <Footer setpage={setPage} page={page} />
        </div>
      </Match>
      <Match when={page == "Boosts"}>
        <div className="bg-black relative ">
          <Boosts points={points} />
          <Footer setpage={setPage} page={page} />
        </div>
      </Match>
    </Switch>
  );
};

export default App;
