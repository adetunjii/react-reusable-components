import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../features/taskManagement/taskManagementSlice";
import TaskCard from "./TaskCard";
import { Task } from "@/types";

const DragnDrop = () => {
  const { tasks } = useSelector((store: any) => store?.taskManagement);

  const dispatch = useDispatch();

  const columns = [
    { title: "Todo", amount: 9, label: "todo" },
    { title: "In Progress", amount: 1, label: "inprogress" },
    { title: "Completed", amount: 5, label: "completed" },
  ];

  const getColumn = (label: string) => {
    return columns.find((column) => column.label === label);
  };

  const editTask = (task: Task) => {
    dispatch(updateTask(task));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    console.log(destination, draggableId);
    if (source.droppableId !== destination.droppableId) {
      const task = tasks.find((task: Task) => task.id === draggableId);
      if (task) editTask({ ...task, status: destination.droppableId.toUpperCase() });
    }
  };

  const getTasks = (status: string): Array<any> => {
    return tasks.filter((task: Task) => task.status.toLowerCase() === status);
  };

  return (
    <div className="bg-white">
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
        <div className="grid grid-cols-3 divide-x-[1px] min-h-screen">
          {columns.map((column: any, index: number) => (
            <Droppable key={column?.label} droppableId={column.label}>
              {(provided, snapshot) => (
                <div className="p-4" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="border-[1px] px-4 py-2 rounded-md flex justify-between items-center">
                    <span>{column.title}</span>
                    <span className="rounded-full p-1 h-6 w-6 text-xs bg-yellow-500 flex flex-col items-center justify-center">
                      {column.amount}
                    </span>
                  </div>

                  <div className="my-4">
                    {getTasks(column.label).map((task: Task, index: number) => (
                      <TaskCard key={task?.id} item={task} index={index} />
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragnDrop;
