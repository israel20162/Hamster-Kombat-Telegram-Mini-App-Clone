import { dollarCoin } from "../images";
import WebApp from "@twa-dev/sdk";

interface EarnProps {
  // add props here
}

const Earn: React.FC<EarnProps> = () => {
  

  return (
    <>
      <div className="h-screen">
        <section className="w-full text-center flex flex-col py-8  gap-6 items-center justify-center bg-repeat-round">
          <div className="round-glow  ">
            <img src={dollarCoin} alt="" className="round-glow " />
          </div>
          <h2 className="text-2xl text-white">Earn more coins</h2>
        </section>
        <section>
          
        </section>
      </div>
    </>
  );
};

export default Earn;
