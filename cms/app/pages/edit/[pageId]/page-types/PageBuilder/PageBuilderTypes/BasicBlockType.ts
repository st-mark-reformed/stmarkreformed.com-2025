import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';
import { UrlFieldTypeSchema } from '../../../../../../inputs/UrlFieldType';
import { AlignmentOptions } from '../../../../../../inputs/AlignmentOptions';
import { BackgroundColorOptions } from './BackgroundColorOptions';

export const BasicBlockTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    // @ts-expect-error TS2769
    backgroundColor: z.enum(Object.values(BackgroundColorOptions)),
    // @ts-expect-error TS2769
    alignment: z.enum(Object.values(AlignmentOptions)),
    preHeadline: z.string(),
    headline: z.string(),
    content: z.string(),
    ctas: z.array(UrlFieldTypeSchema),
}));

export type BasicBlockType = z.infer<typeof BasicBlockTypeSchema>;

export const basicBlockDefaultData: BasicBlockType = {
    id: '',
    type: PageBuilderType.Content_BasicBlock,
    typeName: 'Basic Block',
    internalName: '',
    backgroundColor: BackgroundColorOptions.White,
    alignment: AlignmentOptions.Left,
    preHeadline: '',
    headline: '',
    content: '',
    ctas: [],
};
