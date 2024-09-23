import React from "react";
import HamsterCard from "../../components/hamsterCard";
import { CardTypes } from "../../utils/types";

interface LegalProps {
  isOpen: boolean;
  onClick: (card: CardTypes) => void;
  cards: Array<CardTypes>;
}
const Legal: React.FC<LegalProps> = (props) => {
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

export default Legal;
