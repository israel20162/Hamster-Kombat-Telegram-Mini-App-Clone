import React from "react";
import HamsterCard from "../../components/hamsterCard";


type CardTypes = {
  title: string;
  description: string;
  image: string;
  profitPerHour: number;
  level: number;
  price: number;
};
interface MarketProps {
  isOpen: boolean;
  onClick: () => void;
  cards: Array<CardTypes>;
}
const Markets: React.FC<MarketProps> = (props) => {
  
  return (
    <div className="grid grid-cols-2 w-[95%] mx-auto ">
      {props.cards.map((card, index) => (
        <div key={index}>
          <HamsterCard onClick={props.onClick} cardDeatails={card} />
        </div>
      ))}
    </div>
  );
};

export default Markets;
