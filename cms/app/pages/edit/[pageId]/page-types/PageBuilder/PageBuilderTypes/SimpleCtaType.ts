import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';
import { UrlFieldTypeSchema } from '../../../../../../inputs/UrlFieldType';
import { BackgroundColorOptions } from './BackgroundColorOptions';

export const SimpleCtaTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    // @ts-expect-error TS2769
    backgroundColor: z.enum(Object.values(BackgroundColorOptions)),
    preHeadline: z.string(),
    headline: z.string(),
    content: z.string(),
    ctas: z.array(UrlFieldTypeSchema),
}));

export type SimpleCtaType = z.infer<typeof SimpleCtaTypeSchema>;

export const simpleCtaDefaultData: SimpleCtaType = {
    id: '',
    type: PageBuilderType.Content_BasicBlock,
    typeName: 'Simple CTA',
    isDisabled: false,
    internalName: '',
    backgroundColor: BackgroundColorOptions.White,
    preHeadline: '',
    headline: '',
    content: '',
    ctas: [],
};
