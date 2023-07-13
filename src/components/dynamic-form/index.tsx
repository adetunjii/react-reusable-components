import React, { useState } from "react";

type Props = {};

const DynamicForm = (props: Props) => {
  const [goals, setGoals] = useState<Array<string>>([""]);

  const addNewField = (e: any) => {
    // e.preventDefault();
    const values = [...goals];
    values.push("");
    setGoals(values);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    console.log(goals);
  };

  const handleChange = (e: any, index: number) => {
    const values = [...goals];
    values[index] = e.target.value;
    setGoals(values);
  };

  return (
    <div className="bg-white w-2/3 mx-auto shadow-md p-10 min-h-[200px]">
      <form onSubmit={(e) => handleSubmit(e)}>
        {goals.map((goal: string, index: number) => (
          <div key={index}>
            <label>Goal {index + 1}</label>
            <textarea
              className="w-full border border-slate-300 rounded-md px-4 py-1"
              rows={3}
              onChange={(e) => handleChange(e, index)}
            ></textarea>
          </div>
        ))}

        {/* create a new form field up here once the button is clicked */}

        <button type="button" className="text-[#2E62A6]" onClick={(e) => addNewField(e)}>
          + Add More goals
        </button>

        <button type="submit" className="bg-[#2E62A6] text-white px-3 py-2 ml-5 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
