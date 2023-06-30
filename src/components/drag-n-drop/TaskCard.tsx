import { Task } from "@/types";
import React, { ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  item: Task;
};

const getCategoryTextColor = (category: string): string => {
  const categoryTextColor: { [key: string]: string } = {
    severe: "#BB4023",
    priority: "#9F6B07",
    routine: "#2e62a6",
  };

  return `text-[${categoryTextColor[category]}]`;
};

const getCategoryBg = (category: string): string => {
  const categoryBg: { [key: string]: string } = {
    severe: "#FFBFAD",
    priority: "#FFE6B7",
    routine: "#C8DAF6",
  };

  return `bg-[${categoryBg[category]}]`;
};

const getCategoryBorderColor = (category: string): string => {
  const categoryBorderColor: { [key: string]: string } = {
    severe: "#BB4023",
    priority: "#9F6B07",
    routine: "#2e62a6",
  };

  return `border-[${categoryBorderColor[category]}]`;
};

const TaskCard = ({ item, index }: Props) => {
  console.log(item);
  return (
    <Draggable key={index} draggableId={item?.id} index={index}>
      {(provided) => (
        <div
          className="rounded-md border-[1px] border-slate-300 p-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <div className="rounded-xl border-[1px] py-1 px-2 text-[10px] font-light">{item?.tag}</div>
          </div>

          <div className="my-3 flex justify-between">
            <h2 className="font-semibold">{item?.title}</h2>
            <div
              className={`text-[9px] rounded-xl border-2 px-2 py-1 ${getCategoryBg(item?.category.toLowerCase())} ${getCategoryTextColor(
                item?.category.toLowerCase()
              )} ${getCategoryBorderColor(item?.category.toLowerCase())}`}
            >
              {item?.category}
            </div>
          </div>

          <p className="text-[#818496] text-sm">{item?.description}</p>

          <div className="flex gap-6 my-6">
            <div className="bg-[#f5f5f5] rounded-xl py-1 px-2 font-light text-xs">
              {new Date(item?.date).toLocaleDateString("en-us", { month: "short", day: "2-digit", year: "numeric" })}
            </div>

            <div className="bg-[#f5f5f5] rounded-xl py-1 px-2 font-light text-xs">{item?.duration}</div>
          </div>

          <div className="border-t p-3">
            <div className="bg-[#f5f5f5] rounded-full h-10 w-10 flex justify-center items-center"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
