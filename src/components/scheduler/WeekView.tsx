import { useMemo } from "react";
import HourTape from "./HourTape";
import { DAYS_IN_WEEK, DEFAULT_LOCALE } from "./utils";
import Column from "./Column";
import { OccurenceWithEvent } from "./types";

const WeekView = () => {
  const currentDate = new Date();

  /** useMemo is used for memoization, when we don't need to perform
   * a recalculation on re-renders
   */
  const daysOfWeek = useMemo(() => {
    const weekDay = currentDate.getDay(); // starts from Mon
    const newDate = Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index - weekDay);
      return date;
    });
    return newDate.map((date) => ({
      date,
      dateOfMonth: date.getDate(),
      weekDay: date.toLocaleString(typeof window === "undefined" ? DEFAULT_LOCALE : window?.navigator.language, { weekday: "short" }),
    }));
  }, [currentDate]);

  const occurrences: Array<Array<OccurenceWithEvent>> = [
    [],
    [
      {
        id: 1,
        name: "Test Event",
        color: "#ECF3FC",
        borderColor: "#2E62A6",
        startDateTime: new Date("2023-07-10T02:20:00"),
        endDateTime: new Date("2023-07-10T05:30:00"),
        description: "just a description",
        event: {
          id: 1,
          color: "#ECF3FC",
          startDate: new Date("2023-07-10T02:20:00"),
          endDate: new Date("2023-07-10T05:30:00"),
          daysOfWeek: 2,
          defaultStartTime: new Date("2023-07-10T02:20:00"),
          defaultEndTime: new Date("2023-07-10T05:30:00"),
        },
        eventId: "test_id_1",
      },
    ],
    [
      {
        id: 2,
        name: "Consultation with Mr.Sam on Treatment plan",
        color: "#F9E7F5",
        borderColor: "#C10998",
        startDateTime: new Date("2023-07-13T09:30:00"),
        endDateTime: new Date("2023-07-13T10:30:00"),
        description: "Have a meeting with cyber to resolve issue regarding RDP",
        event: {
          id: 1,
          color: "#F9E7F5",
          startDate: new Date("2023-07-13T09:30:00"),
          endDate: new Date("2023-07-13T10:30:00"),
          daysOfWeek: 2,
          defaultStartTime: new Date("2023-07-13T09:30:00"),
          defaultEndTime: new Date("2023-07-1T10:30:00"),
        },
        eventId: "test_id_1",
      },
    ],
    [
      {
        id: 3,
        name: "Treatment Plan meeting with Dr. Jeni W",
        color: "#FCEAE7",
        borderColor: "#FF9885",
        startDateTime: new Date("2023-07-12T11:30:00"),
        endDateTime: new Date("2023-07-12T12:30:00"),
        description: "Have another demo tomorrow morning",
        event: {
          id: 1,
          color: "#FCEAE7",
          startDate: new Date("2023-07-12T09:30:00"),
          endDate: new Date("2023-07-12T10:30:00"),
          daysOfWeek: 2,
          defaultStartTime: new Date("2023-07-12T09:30:00"),
          defaultEndTime: new Date("2023-07-12T10:30:00"),
        },
        eventId: "test_id_1",
      },
    ],
    [],
    [],
    [],
  ];

  return (
    <div className="flex items-center">
      <HourTape />
      <div
        className={`flex-1 border-l border-gray-300 dark:border-neutral-700
          flex flex-col gap-1`}
      >
        <div className="flex">
          {daysOfWeek.map(({ date, dateOfMonth, weekDay }, index) => (
            <div className="flex flex-1 flex-col border-l" key={index}>
              <div className={`border-b h-20 flex flex-col justify-center items-center font-medium px-2`}>
                <div
                  className={`flex flex-col items-center justify-center text-center rounded-full p-3 h-[50px] w-[50px] ${
                    currentDate.getDate() === dateOfMonth ? "bg-[#2E62A6] text-white font-medium" : "font-light"
                  }`}
                >
                  <span className="text-sm">{dateOfMonth}</span>
                  <span className="text-sm">{weekDay}</span>
                </div>
              </div>

              <Column date={date} occurrences={occurrences?.[index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
