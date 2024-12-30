import { z } from 'zod';
import { UrlFieldTypeSchema } from '../inputs/UrlFieldType';

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
    photo_galleries = 'photo_galleries',
    publications = 'publications',
    menu_link = 'menu_link',
    menu_parent_only = 'menu_parent_only',
}

const pageTypeNoDataBaseSchema = z.object({
    id: z.string(),
    parentId: z.string(),
    name: z.string(),
    slug: z.string(),
    path: z.string(),
    // @ts-expect-error TS2769
    status: z.enum(Object.values(PageStatus)),
    // @ts-expect-error TS2769
    type: z.enum(Object.values(PageType)),
    position: z.number(),
    showInMenu: z.boolean(),
    showSubPageSidebar: z.boolean(),
    useShortHero: z.boolean(),
    useCustomHero: z.boolean(),
    heroDarkeningOverlayOpacity: z.number(),
    heroImage: z.string(),
    heroUpperCta: UrlFieldTypeSchema,
    heroHeading: z.string(),
    heroSubheading: z.string(),
    heroParagraph: z.string(),
});

/**
 * PageType No Data
 */

export type PageTypeNoData = z.infer<typeof pageTypeNoDataBaseSchema> & {
    children: Array<PageTypeNoData>;
};

export const PageTypeNoDataSchema: z.ZodType<PageTypeNoData> = pageTypeNoDataBaseSchema.extend({
    children: z.lazy(() => PageTypeNoDataSchema.array()),
});

export const PageTypeNoDataArraySchema = z.array(PageTypeNoDataSchema);

export type PageTypeNoDataArray = z.infer<typeof PageTypeNoDataArraySchema>;

export type PageTypeFrontEndNoData = z.infer<typeof pageTypeNoDataBaseSchema> & {
    href: string;
    cmsHref: string;
    children: PageTypeFrontEndNoDataArray;
};

export type PageTypeFrontEndNoDataArray = Array<PageTypeFrontEndNoData>;

/**
 * Page Type with data and no children
 */

export const PageTypeWithDataNoChildrenSchema = pageTypeNoDataBaseSchema.extend({
    data: z.string(),
    json: z.array(z.any()),
});

export type PageTypeWithDataNoChildren = z.infer<typeof PageTypeWithDataNoChildrenSchema>;

export type PageTypeWithDataNoChildrenFrontEnd = PageTypeWithDataNoChildren & {
    href: string;
    cmsHref: string;
};

/**
 * Page Type with no data and no children
 */

export const PageTypeWithNoDataAndNoChildrenSchema = pageTypeNoDataBaseSchema;

export type PageTypeWithNoDataAndNoChildren = z.infer<typeof PageTypeWithNoDataAndNoChildrenSchema>;

export type PageTypeWithNoDataAndNoChildrenFrontEnd = PageTypeWithNoDataAndNoChildren & {
    href: string;
    cmsHref: string;
};
