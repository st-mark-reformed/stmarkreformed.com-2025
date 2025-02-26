import { PageStatus } from './PageStatus';
import { ProfileType } from './ProfileType';
import { DateFormats } from './DateFormats';

export enum EntryType {
    entry = 'entry',
    entry_builder = 'entry_builder',
}

export type BlogEntryBaseType = {
    id: string;
    author: ProfileType | null;
    name: string;
    slug: string;
    path: string;
    status: PageStatus;
    type: EntryType;
    data: string;
    json: Array<never>;
    contentExcerpt: string;
    datePublished: string;
    datePublishedFormats: DateFormats;
    href: string;
};
