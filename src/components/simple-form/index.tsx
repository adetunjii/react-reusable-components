import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

const fieldValues = {
  field1: "lorem dolor ipsum",
  field2: "lorem ipsum dolor",
  field3: "ipsum dolor lorem",
  field4: "ipsum lorem dolor",
  field5: "dolor ipsum lorem",
};

type FieldValues = typeof fieldValues;

const SimpleForm = (props: Props) => {
  const [formValues, setFormValues] = useState<FieldValues>(fieldValues);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
    },
  });

  const submitForm = (data: any, e: any) => {
    console.log(data);
  };

  return (
    <div className="w-1/3 mx-auto">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="my-4">
          <label>Why it is important</label>
          <textarea rows={5} className="w-full rounded-lg border" {...register("field1", { value: formValues.field1 })}></textarea>
        </div>

        <div className="my-4">
          <label>Impact</label>
          <textarea rows={5} className="w-full rounded-lg border" {...register("field2")}></textarea>
        </div>

        <div className="my-4">
          <label>Duration</label>
          <input className="w-full rounded-lg border p-2" />
        </div>

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;
