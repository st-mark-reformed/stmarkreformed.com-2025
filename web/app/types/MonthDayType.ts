import { EventType } from './EventType';

export type MonthDayType = {
    isInPast: boolean;
    isCurrentDay: boolean;
    isActiveMonth: boolean;
    ymd: string;
    year: number;
    month: number;
    day: number;
    events: Array<EventType>;
};
