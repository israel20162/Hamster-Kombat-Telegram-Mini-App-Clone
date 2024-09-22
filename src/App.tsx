import React, { useState } from "react";
import Exchange from "./pages/Exchange";
import Footer from "./components/footer";
import Mine from "./pages/Mine";
const App: React.FC = () => {
  const [page, setPage] = useState("Exchange");
  const pointsToAdd = 11;
  const [points, setPoints] = useState(22749365);
  const profitPerHour = 126420;

  switch (page) {
    case "Exchange":
      return (
        <div className="bg-black relative ">
          <Exchange
            points={points}
            pointsToAdd={pointsToAdd}
            setPoints={setPoints}
            profitPerHour={profitPerHour}
          />

          <Footer setpage={setPage} page={page} />
        </div>
      );

    case "Mine":
      return (
        <>
          <Mine
            points={points}
            coinsToLevelUp={1}
            pointsToAdd={pointsToAdd}
            coins={1}
            profitPerHour={profitPerHour}
          />
          <Footer setpage={setPage} page={page} />
        </>
      );

    default:
      break;
  }
};

export default App;
