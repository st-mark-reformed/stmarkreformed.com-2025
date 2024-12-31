import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { Url } from '../../../../types/UrlType';

export type ContentBasicBlockType = PageBuilderBlockBase & {
    backgroundColor: string;
    noTopSpace: boolean;
    alignment: 'Left' | 'Center' | 'Right';
    preHeadline: string;
    headline: string;
    content: string;
    ctas: Array<Url>;
};
