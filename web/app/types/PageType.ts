import { Url } from './UrlType';
import { MonthDayType } from './MonthDayType';
import { EventType } from './EventType';
import { BlogEntryBaseType } from './BlogEntryBaseType';
import { PageStatus } from './PageStatus';

export enum PageType {
    page = 'page',
    page_builder = 'page_builder',
    calendar = 'calendar',
    blog_entries = 'blog_entries',
    podcast_entries = 'podcast_entries',
    menu_link = 'menu_link',
    menu_parent_only = 'menu_parent_only',
}

export type PageBaseType = {
    id: string;
    parentId: string;
    name: string;
    slug: string;
    path: string;
    status: PageStatus;
    type: PageType;
    data: string;
    json: Array<never>;
    position: number;
    showInMenu: boolean;
    showSubPageSidebar: boolean;
    useShortHero: boolean;
    useCustomHero: boolean;
    heroDarkeningOverlayOpacity: number;
    heroImage: string;
    heroImage1x: string;
    heroImage2x: string;
    heroUpperCta: Url;
    heroHeading: string;
    heroSubheading: string;
    heroParagraph: string;
    calendarData?: {
        pagePath: string;
        monthDays: Array<MonthDayType>;
        monthRows: number;
        monthString: string;
        dateHeading: string;
        monthEventsList: Array<EventType>;
    };
    blogEntriesData?: {
        entries: Array<BlogEntryBaseType>;
        pageNumber: number;
        totalPages: number;
        totalEntries: number;
        totalOnThisPage: number;
    };
};
