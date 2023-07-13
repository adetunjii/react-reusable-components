export interface DateInfo {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly today: number | undefined;
  readonly thisDayLastMonth: Date;
  readonly thisDayNextMonth: Date;
}

/** EventTable holds information about a particular event
 *  use EventTable instead of 'Event' because 'Event' is a global typescript type
 */
export type EventTable = {
  id: number;
  startDate: Date;
  endDate: Date;
  defaultStartTime: Date;
  defaultEndTime: Date;
  daysOfWeek: number;
  color: string;
};

/** EventOccurence hold information about a recurring event
 *
 */
export type EventOccurence = {
  id: number;
  name: string;
  description?: string;
  startDateTime: Date;
  endDateTime: Date;
  color?: string;
  borderColor?: string;
  eventId: string;
};

export type OccurenceWithEvent = EventOccurence & {
  readonly event: EventTable;
};

export type Calendar = {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly color: string;
};

export type RA<V> = readonly V[];
