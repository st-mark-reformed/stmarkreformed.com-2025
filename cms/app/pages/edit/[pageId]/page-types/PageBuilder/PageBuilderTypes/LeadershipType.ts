import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const LeadershipTypeSchema = PageBuilderBaseTypeSchema;

export type LeadershipType = z.infer<typeof LeadershipTypeSchema>;

export const leadershipDefaultData: LeadershipType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Upcoming Events',
    internalName: '',
};
