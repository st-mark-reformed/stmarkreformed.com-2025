import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';
import { BackgroundColorOptionsNoWhite } from './BackgroundColorOptions';
import { DualContentDispositionOptions } from './ContentDispositionOptions';
import { UrlFieldTypeSchema, UrlFieldTypeValues } from '../../../../../../inputs/UrlFieldType';

export const ImageContentCtaTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    // @ts-expect-error TS2769
    backgroundColor: z.enum(Object.values(BackgroundColorOptionsNoWhite)),
    // @ts-expect-error TS2769
    contentDisposition: z.enum(Object.values(DualContentDispositionOptions)),
    image: z.string(),
    showTealOverlayOnImages: z.boolean(),
    preHeadline: z.string(),
    headline: z.string(),
    content: z.string(),
    cta: UrlFieldTypeSchema,
}));

export type ImageContentCtaType = z.infer<typeof ImageContentCtaTypeSchema>;

export const imageContentCtaDefaultData: ImageContentCtaType = {
    id: '',
    type: PageBuilderType.Content_BasicBlock,
    typeName: 'Image / Content / CTA',
    isDisabled: false,
    internalName: '',
    backgroundColor: BackgroundColorOptionsNoWhite.CrimsonDark,
    contentDisposition: DualContentDispositionOptions.ImageLeftContentRight,
    image: '',
    showTealOverlayOnImages: false,
    preHeadline: '',
    headline: '',
    content: '',
    cta: {
        id: '',
        type: UrlFieldTypeValues.Custom,
        linkText: '',
        linkData: '',
        newWindow: false,
    },
};
