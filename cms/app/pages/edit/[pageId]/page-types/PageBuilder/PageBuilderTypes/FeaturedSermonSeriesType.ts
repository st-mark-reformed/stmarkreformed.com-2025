import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const FeaturedSermonSeriesTypeSchema = PageBuilderBaseTypeSchema;

export type FeaturedSermonSeriesType = z.infer<typeof FeaturedSermonSeriesTypeSchema>;

export const featuredSermonSeriesDefaultData: FeaturedSermonSeriesType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Upcoming Events',
    isDisabled: false,
    internalName: '',
};
