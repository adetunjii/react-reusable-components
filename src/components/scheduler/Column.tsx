import React from "react";
import { DAY, DEFAULT_MINUTE_ROUNDING, HOUR, HOURS_IN_DAY, MILLISECONDS, MINUTE, dateToString, dateToTimeString } from "./utils";
import { OccurenceWithEvent, RA } from "./types";

const usePlacing = (
  occurrences: RA<OccurenceWithEvent> | undefined
): RA<{
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
  readonly atomCount: number;
}> => {
  return React.useMemo(() => {
    const atomCount = (HOURS_IN_DAY * HOUR) / MINUTE / DEFAULT_MINUTE_ROUNDING;
    const atoms = Array.from(
      {
        length: atomCount,
      },
      (): number[] => []
    );
    const startDate = new Date(occurrences?.[0]?.startDateTime ?? new Date());
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    const startTime = startDate.getTime();
    const startString = dateToString(startDate);
    occurrences?.forEach(({ id, startDateTime, endDateTime }) => {
      const startAtom = Math.floor(((startDateTime.getTime() - startTime) / DAY / MILLISECONDS) * atomCount);
      const endAtom =
        startString === dateToString(endDateTime)
          ? Math.ceil(((endDateTime.getTime() - startTime) / DAY / MILLISECONDS) * atomCount)
          : atomCount;
      Array.from({ length: endAtom - startAtom }, (_, index) => {
        atoms[startAtom + index].push(id);
      });
    });

    return (
      occurrences?.map(({ id }) => {
        const startIndex = atoms.findIndex((atom) => atom.includes(id));
        const endIndex =
          atoms.length -
          Array.from(atoms)
            .reverse()
            .findIndex((atom) => atom.includes(id));
        const fraction = Math.max(...atoms.slice(startIndex, endIndex).map((atom) => atom.length));
        const left = Math.max(...atoms.slice(startIndex, endIndex).map((atom) => atom.indexOf(id)));

        return {
          top: (startIndex / atomCount) * 100,
          left: (left / fraction) * 100,
          width: (1 / fraction) * 100,
          height: ((endIndex - startIndex) / atomCount) * 100,
          atomCount: endIndex - startIndex,
        };
      }) ?? []
    );
  }, [occurrences]);
};

// need to get the events for each day in the day interval

const Column = ({ date, occurrences }: { readonly date: Date; readonly occurrences: any }) => {
  const [currentTime, setCurrentTime] = React.useState<number | undefined>(undefined);
  const placing = usePlacing(occurrences);

  React.useEffect(() => {
    function update(): void {
      const currentDate = new Date();
      if (dateToString(currentDate) === dateToString(date)) {
        const dayStart = new Date();
        dayStart.setHours(0);
        dayStart.setMinutes(0);
        dayStart.setSeconds(0);
        setCurrentTime((currentDate.getTime() - dayStart.getTime()) / DAY / MILLISECONDS);
      } else {
        setCurrentTime(undefined);
      }
    }

    const interval = setInterval(update, MINUTE * MILLISECONDS);
    update();
    return (): void => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex-1 flex flex-col relative">
      {typeof currentTime === "number" && (
        <div
          aria-hidden={true}
          className="absolute w-full bg-red-500 h-0.5 z-30 pointer-events-none"
          style={{
            top: `${currentTime * 100}%`,
          }}
        >
          <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-red-500" />
        </div>
      )}
      {Array.from({ length: HOURS_IN_DAY }, (_, index) => (
        <span key={index} className="text-xs border-b text-center cursor-pointer h-12" />
      ))}
      {occurrences?.map(({ id, name, description, startDateTime, endDateTime, color, borderColor, event }: any, index: number) => (
        <div
          style={{
            backgroundColor: color,
            borderColor: borderColor,
            top: `${placing[index].top}%`,
            left: `${placing[index].left}%`,
            width: `${placing[index].width}%`,
            height: `${placing[index].height}%`,
          }}
          className={`rounded border-[1px] hover:brightness-150 z-10 absolute flex flex-col overflow-hidden text-xs py-1.5 px-3`}
        >
          <p className="font-semibold whitespace-nowrap">{name}</p>
          <p className="my-1 text-xs whitespace-nowrap">{description}</p>
          <p className="my-3">{dateToTimeString(startDateTime) + " - " + dateToTimeString(endDateTime)}</p>
        </div>
      ))}
    </div>
  );
};

export default Column;
