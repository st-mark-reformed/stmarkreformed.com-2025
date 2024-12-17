import {
    PageTypeFrontEndNoData,
    PageTypeNoData,
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
    PageTypeWithNoDataAndNoChildren,
    PageTypeWithNoDataAndNoChildrenFrontEnd,
} from './PageType';

export function TransformPageTypeNoData (
    page: PageTypeNoData,
): PageTypeFrontEndNoData {
    return {
        ...page,
        href: `/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
        children: page.children.map((child) => TransformPageTypeNoData(child)),
    };
}

export function TransformPageTypeWithDataNoChildren (
    page: PageTypeWithDataNoChildren,
): PageTypeWithDataNoChildrenFrontEnd {
    return {
        ...page,
        href: `/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
    };
}

export function TransformPageTypeWithNoDataNoChildren (
    page: PageTypeWithNoDataAndNoChildren,
): PageTypeWithNoDataAndNoChildrenFrontEnd {
    return {
        ...page,
        href: `/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
    };
}
