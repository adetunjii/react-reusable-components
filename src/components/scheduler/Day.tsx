import { useState, useEffect } from "react";

type DayProps = {
  readonly date: Date;
};

const Day = ({ date }: DayProps) => {
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);

  useEffect(() => {}, [date]);
};

export default Day;
