import {
    PageStatus,
    PageTypeNoDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../pages/PageType';
import {
    ProfileType,
    ProfileTypeFrontEnd,
} from '../profiles/ProfileType';

export enum Type {
    entry = 'entry',
    entry_builder = 'entry_builder',
}

export type EntryType = {
    id: string;
    blogPage: PageTypeNoDataNoChildren;
    author: ProfileType;
    name: string;
    slug: string;
    path: string;
    status: PageStatus;
    type: Type;
    data: string;
    json: Array<never>;
    datePublished: string;
};

export type EntryTypeFrontEnd = EntryType & {
    blogPage: PageTypeWithDataNoChildrenFrontEnd;
    author: ProfileTypeFrontEnd;
};
