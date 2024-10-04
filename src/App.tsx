import React, { useEffect, useState } from "react";
import Exchange from "./pages/Exchange";
import Footer from "./components/footer";
import Mine from "./pages/Mine";
import { Switch, Match } from "./utils/reactComponents";
import Friends from "./pages/Friends";
import Earn from "./pages/Earn";
import { useTelegram } from "./hooks/useTelegram";
import { createOrGetUser } from "./server/Api";


const App: React.FC = () => {
  const [page, setPage] = useState("Exchange");
  const pointsToAdd = 11;
  const [points, setPoints] = useState(22749365);
  const profitPerHour = 126420;
  const { user } = useTelegram();
 
  useEffect(() => {

    createOrGetUser(669088808876556);
  }, []);

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
    </Switch>
  );

  switch (page) {
    case "Exchange":

    case "Mine":
      return <></>;

    default:
      break;
  }
};

export default App;
