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

export type Condition = {
  health_issue: string;
  hc_user_id: string;
  hp_user_id: string;
  date: Date | null;
  isActive?: boolean;
};

export type TreatmentPlan = {
  name: string;
  code: "SPECIALIST" | "TCA" | "GPMP";
  importance?: string;
  impact?: string;
  duration?: string;
  reminders?: string;
  completionTime?: string;
  completionBarriers?: string[];
  measures?: string[];
  goals?: string[];
  monitoring?: string;
  rewards?: string[];
  date?: Date;
  isActivitiesScheduled?: boolean;
};

export type ConditionWithTreatmentPlan = Condition & { treatmentPlans: Array<TreatmentPlan> };
