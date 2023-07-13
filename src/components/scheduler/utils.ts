export const DEFAULT_LANGUAGE = "en-us";
export const DEFAULT_LOCALE = "en-au";
export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
export const HOURS_IN_DAY = 24;
export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 4 * WEEK;
export const YEAR = 12 * MONTH;
export const MILLISECONDS = 1000;
export const DEFAULT_EVENT_DURATION = 15 * MINUTE * MILLISECONDS;

// Round current time to the nearest 15 minutes when getting time for new event
export const DEFAULT_MINUTE_ROUNDING = 10;

export const startWithSunday = true;

export const getDateInfo = (currentDate: Date) => void {};

export const padNumber = (num: number): string => {
  return num.toString().padStart(2, "0");
};

export const dateToString = (date: Date): string => {
  return `${padNumber(date.getFullYear())}-${padNumber(date.getMonth())}-${padNumber(date.getDate())}`;
};

export const dateToTimeString = (date: Date): string => {
  return `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;
};
