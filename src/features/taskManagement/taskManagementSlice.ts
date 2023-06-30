import { Task } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type TaskManagementState = {
  tasks: Array<Task>;
};

const initialState: TaskManagementState = {
  tasks: [
    {
      id: "1",
      tag: "Treatment Plan",
      description: "Upload pathology and radiology forms",
      title: "Update Treatment Plan forms for Aaron Joseph",
      date: "06-29-2023",
      duration: "10:00AM-10:30AM",
      category: "ROUTINE",
      status: "TODO",
    },
  ],
};

const taskManagementSlice = createSlice({
  name: "task-management",
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    updateTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => (task.id === payload.id ? payload : task));
    },
  },
});

export const { createTask, updateTask } = taskManagementSlice.actions;
export default taskManagementSlice.reducer;
