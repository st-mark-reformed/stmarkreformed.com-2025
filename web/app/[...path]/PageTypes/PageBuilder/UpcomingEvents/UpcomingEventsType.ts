import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { EventType } from '../../../../types/EventType';

export type UpcomingEventsType = PageBuilderBlockBase & {
    heading: string;
    subHeading: string;
    calendarPage: string;
    events: Array<EventType>;
};
