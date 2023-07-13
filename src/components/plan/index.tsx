import React, { useState, useEffect, ChangeEvent } from "react";
import { RootState } from "@/app/store";
import { Condition, ConditionWithTreatmentPlan, TreatmentPlan } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { dateToString } from "../scheduler/utils";
import { createConditionWithTreatmentPlan, editConditionWithTreatmentPlan } from "../../features/plan/planSlice";
import { useForm } from "react-hook-form";

type Action<T> = {
  type?: string;
  payload: T;
};

type Props = {};

const Plan = (props: Props) => {
  const patientId = "1";
  const { healthConditions, treatmentPlans, conditionsWithTreatmentPlan } = useSelector(
    (state: RootState) => state.treatmentPlans
  );

  const [patientHealthConditions, setPatientHealthConditions] = useState<Array<Condition> | null>(null);
  const [selectedHealthCondition, setSelectedHealthCondition] = useState<Condition | null>(healthConditions[0]);
  const [availableTreatmentPlans, setAvailableTreatmentPlans] = useState<Array<TreatmentPlan>>(treatmentPlans);
  const [treatmentPlanDetails, setTreatmentPlanDetails] = useState<TreatmentPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);

  const [date, setDate] = useState<Date | null>(null);

  const handleSelectPlan = (e: ChangeEvent<HTMLSelectElement>) => {
    const plan = treatmentPlans.find((plan) => plan.code === e.target.value);
    if (plan) setSelectedPlan(plan);
  };

  const handleSelectCondition = (e: ChangeEvent<HTMLSelectElement>) => {
    const condition = healthConditions.find((condition) => condition.health_issue === e.target.value);
    if (condition) setSelectedHealthCondition(condition);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const conditions = healthConditions.filter((condition) => condition.hc_user_id === patientId);
    setPatientHealthConditions(conditions);

    const availableTreatmentPlans = getAvailableTreatmentPlans();
    console.log(availableTreatmentPlans);
    setAvailableTreatmentPlans(availableTreatmentPlans);
  }, []);

  const selectHealthCondition = () => {};

  const getAvailableTreatmentPlans = (): Array<TreatmentPlan> => {
    const existingPlans = conditionsWithTreatmentPlan
      .find(
        (condition) =>
          condition.hc_user_id === patientId && condition.health_issue === selectedHealthCondition?.health_issue
      )
      ?.treatmentPlans.map((plan) => plan.code);

    // filter treatmentPlans where plan is not in existing plans
    const plans = availableTreatmentPlans.filter((plan) => !existingPlans?.includes(plan.code));
    return plans;
  };

  const createPlan = (e: any) => {
    e.preventDefault();

    const treatmentPlans = [];
    if (selectedPlan) treatmentPlans.push(selectedPlan);

    let dateString = "";
    if (date) dateString = dateToString(date);

    const payload: ConditionWithTreatmentPlan = {
      hc_user_id: patientId,
      hp_user_id: selectedHealthCondition?.hp_user_id as string,
      health_issue: selectedHealthCondition?.health_issue as string,
      treatmentPlans,
      date: date,
    };

    dispatch(createConditionWithTreatmentPlan(payload));
  };

  const durations = ["3 months", "6 months", "1 year"];
  const addToExistingTreatmentPlan = () => {};

  const [remiders, setReminders] = useState<string | any>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const [completionBarriers, setCompletionBarriers] = useState<Array<string>>([]);
  const [rewards, setRewards] = useState<Array<string>>([]);
  const [goals, setGoals] = useState<Array<string>>([]);
  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const addNewField = (e: any, fieldFor: "completionBarriers" | "rewards" | "goals"): void => {
    e.preventDefault();
    switch (fieldFor) {
      case "completionBarriers":
        const barriers = [...completionBarriers];
        barriers.push("");
        setCompletionBarriers(barriers);
        return;
      case "goals":
        const g = [...goals];
        g.push("");
        setGoals(g);
        return;
      case "rewards":
        const r = [...rewards];
        r.push("");
        setRewards(r);
        return;
      default:
    }
  };

  const handleCreateNewField = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number,
    fieldFor: "completionBarriers" | "rewards" | "goals"
  ): void => {
    switch (fieldFor) {
      case "completionBarriers":
        const values = [...completionBarriers];
        values[index] = e.target.value;
        setCompletionBarriers(values);
        return;
      case "rewards":
        const r = [...rewards];
        r[index] = e.target.value;
        setRewards(r);
        return;
      case "goals":
        const g = [...goals];
        g[index] = e.target.value;
        setGoals(g);
        return;
      default:
    }
  };

  const { handleSubmit, register } = useForm({
    defaultValues: {
      importance: "",
      impact: "",
      reminders: "",
      completionTime: "",
      monitoring: "",
    },
  });

  const updateTreatmentPlan = (data: any, e: any) => {
    if (selectedPlan) {
      const payload: TreatmentPlan = {
        ...data,
        ...selectedPlan,
      };

      console.log(payload);
      //   setTreatmentPlanDetails(payload);
      nextStep();
    }
  };

  const editTreatmentPlan = (e: any) => {
    e.preventDefault();
    const payload = { ...treatmentPlanDetails };
    payload.completionBarriers = completionBarriers;
    payload.goals = goals;
    payload.rewards = rewards;

    console.log(payload);
    dispatch(editConditionWithTreatmentPlan(payload));
  };

  return (
    <div>
      {/* schedule activities screen => route to /schedule/activity */}
      <div>
        <h2 className="font-medium">Schedule</h2>
        <div className="bg-white rounded-lg"></div>
      </div>

      {/* complete treatment plan setup */}
      <div className="bg-[#f5f5f5] p-5 w-2/5 mx-auto my-6 rounded-lg">
        {step === 1 && (
          <form onSubmit={handleSubmit(updateTreatmentPlan)}>
            <div>
              <label htmlFor="condition">Why it is important?</label>
              <textarea
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                {...register("importance", { required: true })}
              ></textarea>
            </div>
            <div>
              <label htmlFor="condition">Impact</label>
              <input
                type="text"
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                {...register("impact", { required: true })}
              />
            </div>
            <div>
              <label>Duration</label>
              <select
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setDuration(e.target.value as string)}
              >
                <option selected></option>

                {durations.map((d: string) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>{" "}
            </div>

            <div>
              <label htmlFor="condition">Reminders</label>
              <input
                type="text"
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                {...register("reminders", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="condition">Time for Completion</label>
              <input
                type="text"
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                {...register("completionTime", { required: true })}
              />
            </div>

            <div>
              <label>Monitoring</label>
              <input
                type="text"
                className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                {...register("monitoring", { required: true })}
              />
            </div>
            <div className="flex gap-x-8">
              <button type="submit" className="bg-blue-400 w-full p-3 text-center rounded-lg my-6">
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <form>
              <div>
                <label>Barrier 1</label>
                <textarea
                  className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                  onChange={(e) => handleCreateNewField(e, 0, "completionBarriers")}
                ></textarea>

                {completionBarriers.slice(1)?.map((barrier: string | null, index: number) => (
                  <div key={index + 1}>
                    <label>Barrier {index + 2}</label>

                    <textarea
                      key={index + 1}
                      className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                      onChange={(e) => handleCreateNewField(e, index, "completionBarriers")}
                    ></textarea>
                  </div>
                ))}
              </div>

              <button onClick={(e) => addNewField(e, "completionBarriers")}>+ Add Barrier</button>

              <div className="flex gap-x-8">
                <button onClick={() => prevStep()} className="bg-blue-400 w-full p-3 text-center rounded-lg my-4">
                  Prev
                </button>
                <button onClick={nextStep} type="submit" className="bg-blue-400 w-full p-3 text-center rounded-lg my-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <form>
              <div>
                <label>Goal 1</label>
                <textarea
                  className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                  onChange={(e) => handleCreateNewField(e, 0, "goals")}
                ></textarea>

                {completionBarriers.slice(1)?.map((barrier: string | null, index: number) => (
                  <div key={index}>
                    <label>Goal {index + 2}</label>

                    <textarea
                      key={index + 1}
                      className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                      onChange={(e) => handleCreateNewField(e, index, "goals")}
                    ></textarea>
                  </div>
                ))}
              </div>

              <button onClick={(e) => addNewField(e, "goals")}>+ Add New Goal</button>
              <div className="flex gap-x-4">
                <button onClick={() => prevStep()} className="bg-blue-400 w-full p-3 text-center rounded-lg my-4">
                  Prev
                </button>
                <button onClick={nextStep} type="submit" className="bg-blue-400 w-full p-3 text-center rounded-lg my-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 4 && (
          <div>
            <form>
              <div>
                <label>Reward 1</label>
                <textarea
                  className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                  onChange={(e) => handleCreateNewField(e, 0, "rewards")}
                ></textarea>

                {completionBarriers.slice(1)?.map((barrier: string | null, index: number) => (
                  <div key={index}>
                    <label>Reward {index + 2}</label>

                    <textarea
                      key={index + 1}
                      className="border border-slate-300 p-2 rounded-lg my-1 w-full"
                      onChange={(e) => handleCreateNewField(e, index, "rewards")}
                    ></textarea>
                  </div>
                ))}
              </div>

              <button onClick={(e) => addNewField(e, "rewards")}>+ Add New Reward</button>

              <div className="flex gap-x-4">
                <button onClick={() => prevStep()} className="bg-blue-400 w-full p-3 text-center rounded-lg my-4">
                  Prev
                </button>
                <button
                  type="submit"
                  onClick={(e) => editTreatmentPlan(e)}
                  className="bg-blue-400 w-full p-3 text-center rounded-lg my-4"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* create treatment plan */}
      <div className="bg-white p-5 rounded-lg w-1/3 mx-auto">
        <form onSubmit={createPlan} id="treatmentPlanForm">
          <div>
            <label htmlFor="condition">Condition</label>
            <select className="border border-slate-300 p-2 rounded-lg my-1 w-full" onChange={handleSelectCondition}>
              <option selected></option>

              {healthConditions.map((condition: Condition) => (
                <option key={condition.health_issue} value={condition.health_issue}>
                  {condition.health_issue}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="condition">Treatment Plan</label>
            <select className="border border-slate-300 p-2 rounded-lg my-1 w-full" onChange={handleSelectPlan}>
              <option selected></option>

              {availableTreatmentPlans.map((plan: TreatmentPlan) => (
                <option key={plan.code} value={plan.code}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="condition">Date</label>
            <input
              type="date"
              className="border border-slate-300 p-2 rounded-lg my-1 w-full"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
            />
          </div>

          <button type="submit" className="bg-blue-400 w-full p-3 text-center rounded-lg">
            Submit
          </button>
        </form>
      </div>

      {/* add to existing treatmentPlan */}
      <div className="bg-[#f5f5f5] p-5 w-1/3 mx-auto my-6 rounded-lg">
        <form>
          <div className="bg-blue-200  p-2 rounded-md my-3">
            <p className="text-xs">Condition</p>
            <h2 className="text-base font-normal">{selectedHealthCondition?.health_issue}</h2>
          </div>

          <div>
            <label htmlFor="condition">Treatment Plan</label>
            <select className="border border-slate-300 p-2 rounded-lg my-1 w-full" onChange={handleSelectPlan}>
              <option selected></option>

              {availableTreatmentPlans.map((plan: TreatmentPlan) => (
                <option key={plan.code} value={plan.code}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="condition">Date</label>
            <input
              type="date"
              className="border border-slate-300 p-2 rounded-lg my-1 w-full"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))}
            />
          </div>

          <button type="submit" className="bg-blue-400 w-full p-3 text-center rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Plan;
