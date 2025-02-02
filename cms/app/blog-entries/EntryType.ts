import {
    PageStatus,
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../pages/PageType';
import {
    ProfileType,
    ProfileTypeFrontEnd,
} from '../profiles/ProfileType';
import { ConfigOptions, getConfigString } from '../serverSideRunTimeConfig';
import { TransformPageTypeWithDataNoChildren } from '../pages/PageTransformer';
import { TransformProfileType } from '../profiles/ProfileTransformer';

export enum Type {
    entry = 'entry',
    entry_builder = 'entry_builder',
}

export type EntryType = {
    id: string;
    blogPage: PageTypeWithDataNoChildren;
    author: ProfileType | null;
    name: string;
    slug: string;
    path: string;
    status: PageStatus;
    type: Type;
    data: string;
    json: Array<never>;
    datePublished: string | null;
};

export type EntryTypeFrontEnd = Omit<
EntryType,
'blogPage' | 'author' | 'datePublished'
> & {
    blogPage: PageTypeWithDataNoChildrenFrontEnd;
    author: ProfileTypeFrontEnd | null;
    datePublished: Date | null;
    href: string;
    cmsHref: string;
};

export function TransformEntry (entry: EntryType): EntryTypeFrontEnd {
    const feUrl = getConfigString(ConfigOptions.FRONT_END_URL);

    let date = null;

    if (entry.datePublished) {
        date = new Date(entry.datePublished);
    }

    return {
        ...entry,
        blogPage: TransformPageTypeWithDataNoChildren(entry.blogPage),
        author: entry.author ? TransformProfileType(entry.author) : null,
        datePublished: date,
        href: `${feUrl}/${entry.path}`,
        cmsHref: `/blog-entries/${entry.blogPage.id}/edit/${entry.id}`,
    };
}
