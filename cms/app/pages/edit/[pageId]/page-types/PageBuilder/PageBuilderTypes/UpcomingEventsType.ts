import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const UpcomingEventsTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    heading: z.string(),
    subHeading: z.string(),
    calendarPage: z.string(),
}));

export type UpcomingEventsType = z.infer<typeof UpcomingEventsTypeSchema>;

export const upcomingEventsDefaultData: UpcomingEventsType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Upcoming Events',
    isDisabled: false,
    internalName: '',
    heading: '',
    subHeading: '',
    calendarPage: '',
};
