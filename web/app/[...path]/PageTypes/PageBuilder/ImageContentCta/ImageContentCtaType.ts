import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { Url } from '../../../../types/UrlType';

export type ImageContentCtaType = PageBuilderBlockBase & {
    backgroundColor: string;
    contentDisposition: 'Image Left / Content Right' | 'Content Left / Image Right';
    image: string;
    showTealOverlayOnImages: boolean;
    preHeadline: string;
    headline: string;
    content: string;
    cta: Url;
};
