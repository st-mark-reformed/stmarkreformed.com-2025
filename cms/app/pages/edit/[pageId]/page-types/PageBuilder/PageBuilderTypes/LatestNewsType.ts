import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const LatestNewsTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    heading: z.string(),
    subHeading: z.string(),
}));

export type LatestNewsType = z.infer<typeof LatestNewsTypeSchema>;

export const latestNewsDefaultData: LatestNewsType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Latest News',
    isDisabled: false,
    internalName: '',
    heading: '',
    subHeading: '',
};
