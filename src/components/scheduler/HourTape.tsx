import { padNumber } from "./utils";
import { HOURS_IN_DAY } from "./utils";

const HourTape = () => {
  return (
    <div className="flex flex-col text-gray-500 w-12">
      <div className="flex flex-col">
        <div className="h-20 border-b text-xs text-center border-t"></div>
        {Array.from({ length: HOURS_IN_DAY }, (_, index) => (
          <div key={index} className="h-12 text-xs border-b text-center flex relative">
            <span className="absolute -top-2 bg-white pl-2 pr-1"> {`${padNumber(index)}:00`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourTape;
