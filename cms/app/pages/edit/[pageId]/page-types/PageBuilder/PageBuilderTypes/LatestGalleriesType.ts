import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const LatestGalleriesTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    heading: z.string(),
    subHeading: z.string(),
}));

export type LatestGalleriesType = z.infer<typeof LatestGalleriesTypeSchema>;

export const latestGalleriesDefaultData: LatestGalleriesType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Latest Galleries',
    isDisabled: false,
    internalName: '',
    heading: '',
    subHeading: '',
};
