import { z } from 'zod';

export enum PageBuilderType {
    Content_BasicBlock = 'Content_BasicBlock',
    Content_ContactForm = 'Content_ContactForm',
    Content_StripePaymentForm = 'Content_StripePaymentForm',
    CTAs_SimpleCta = 'CTAs_SimpleCta',
    CTAs_ImageContentCta = 'CTAs_ImageContentCta',
    Features_UpcomingEvents = 'Features_UpcomingEvents',
    Features_LatestGalleries = 'Features_LatestGalleries',
    Features_LatestNews = 'Features_LatestNews',
    'Pre-defined_FeaturedSermonSeries' = 'Pre-defined_FeaturedSermonSeries',
    'Pre-defined_Leadership' = 'Pre-defined_Leadership',
}

export const PageBuilderBaseTypeSchema = z.object({
    id: z.string(),
    // @ts-expect-error TS2769
    type: z.enum(Object.values(PageBuilderType)),
    typeName: z.string(),
    isDisabled: z.boolean(),
    internalName: z.string(),
});

export type PageBuilderBaseType = z.infer<typeof PageBuilderBaseTypeSchema>;

export const PageBuilderBaseTypeArraySchema = z.array(PageBuilderBaseTypeSchema);

export type PageBuilderBaseTypeArray = z.infer<typeof PageBuilderBaseTypeArraySchema>;
