import { Url } from './UrlType';

export enum PageStatus {
    published = 'published',
    unpublished = 'unpublished',
}

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
    heroUpperCta: Url;
    heroHeading: string;
    heroSubheading: string;
    heroParagraph: string;
};
