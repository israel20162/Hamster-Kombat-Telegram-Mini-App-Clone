import React from "react";
import HamsterCard from "../../components/hamsterCard";

const PR: React.FC = () => {
  return (
    <div className="grid grid-cols-2 w-[95%] mx-auto ">
      <HamsterCard />
      <HamsterCard />
      <HamsterCard />
      <HamsterCard />
    </div>
  );
};

export default PR;
