import { dollarCoin } from "../images";
import formatCardPrice from "../utils/formatCardPrice";

interface TaskCardProps {
  points: number;
  title: string;
  img: any;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  return (
    <div className="text-end col-span-1 bg-gray-700 p-4 w-11/12 overflow-clip mx-auto rounded-2xl flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="p- rounded-lg bg-[#1d2025] ">
          <img src={props.img} alt="" />
        </div>
        <div>
          <p className="text-sm flex flex-col gap-1 items-start">
            <span className="capitalize text-xl">{props.title} </span>
            <div className="text-xs flex items-center justify-evenly max-w-15">
              <span className="flex gap-1 mx-1">
                <img src={dollarCoin} className="h-4 w-4" alt="" />
                <span>{formatCardPrice(props.points)} </span>
              </span>
            </div>
          </p>
        </div>
      </div>

      <div className="flex gap-1 items-center justify-evenly w-2/12 "></div>
    </div>
  );
};

export default TaskCard;
