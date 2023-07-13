import { Condition, ConditionWithTreatmentPlan, TreatmentPlan } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type PlanState = {
  healthConditions: Array<Condicc
 de tion>;
  treatmentPlans: Array<TreatmentPlan>;
  conditionsWithTreatmentPlan: Array<ConditionWithTreatmentPlan>;
};

const initialState: PlanState = {
  healthConditions: [
    {
      hc_user_id: "1",
      hp_user_id: "3",
      date: new Date("2023-07-09T:09:00:00"),
      health_issue: "Obesity",
      isActive: false,
    },
  ],
  treatmentPlans: [
    {
      name: "GPMP-SMART GOAL",
      code: "GPMP",
      isActivitiesScheduled: false,
    },
    {
      name: "TCA-SMART GOAL",
      code: "TCA",
      isActivitiesScheduled: false,
    },
    {
      name: "SPECIALIST MP - SMART GOAL",
      code: "SPECIALIST",
      isActivitiesScheduled: false,
    },
  ],
  conditionsWithTreatmentPlan: [],
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    createConditionWithTreatmentPlan: (state, { payload }) => {
      state.conditionsWithTreatmentPlan.push(payload);
    },
    editConditionWithTreatmentPlan: (state, { payload }) => {
      // assumes payload = {hc_user_id: string; health_issue: string; treatmentPlan: TreatmentPlan}
      let patientCondition = state.conditionsWithTreatmentPlan.find(
        (plan) => plan.hc_user_id === payload.hc_user_id && plan.health_issue === payload.health_issue
      );
      let existingTreatmentPlans = patientCondition?.treatmentPlans;
      let planIdx = existingTreatmentPlans?.findIndex((plan) => plan.code === payload.treatmentPlan.code);
      if (planIdx && planIdx > -1) {
        existingTreatmentPlans?.splice(planIdx, 1, payload.treatmentPlan);
      }
    },
  },
});

export const { createConditionWithTreatmentPlan, editConditionWithTreatmentPlan } = planSlice.actions;
export default planSlice.reducer;
