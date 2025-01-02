import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { Url } from '../../../../types/UrlType';

export type SimpleCtaBlockType = PageBuilderBlockBase & {
    backgroundColor: string;
    preHeadline: string;
    headline: string;
    content: string;
    ctas: Array<Url>;
};
