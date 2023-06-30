export type Task = {
  id: string;
  tag: string;
  description: string;
  title: string;
  date: string;
  duration: string;
  assignee?: string;
  category: "ROUTINE" | "PRIORITY" | "SEVERE";
  status: "TODO" | "INPROGRESS" | "COMPLETED";
};
