import { z } from 'zod';

export enum UrlFieldTypeValues {
    // Page = 'Page',
    // Entry = 'Entry',
    Custom = 'Custom',
}

export const UrlFieldTypeSchema = z.object({
    id: z.string(),
    // @ts-expect-error TS2769
    type: z.enum(Object.values(UrlFieldTypeValues)),
    linkText: z.string(),
    linkData: z.string(),
    newWindow: z.boolean(),
});

export type UrlFieldType = z.infer<typeof UrlFieldTypeSchema>;
