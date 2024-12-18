import {
    PageTypeFrontEndNoData,
    PageTypeNoData,
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
    PageTypeWithNoDataAndNoChildren,
    PageTypeWithNoDataAndNoChildrenFrontEnd,
} from './PageType';
import { ConfigOptions, getConfigString } from '../serverSideRunTimeConfig';

export function TransformPageTypeNoData (
    page: PageTypeNoData,
): PageTypeFrontEndNoData {
    const feUrl = getConfigString(ConfigOptions.FRONT_END_URL);

    return {
        ...page,
        href: `${feUrl}/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
        children: page.children.map((child) => TransformPageTypeNoData(child)),
    };
}

export function TransformPageTypeWithDataNoChildren (
    page: PageTypeWithDataNoChildren,
): PageTypeWithDataNoChildrenFrontEnd {
    const feUrl = getConfigString(ConfigOptions.FRONT_END_URL);

    return {
        ...page,
        href: `${feUrl}/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
    };
}

export function TransformPageTypeWithNoDataNoChildren (
    page: PageTypeWithNoDataAndNoChildren,
): PageTypeWithNoDataAndNoChildrenFrontEnd {
    const feUrl = getConfigString(ConfigOptions.FRONT_END_URL);

    return {
        ...page,
        href: `${feUrl}/${page.path}`,
        cmsHref: `/pages/edit/${page.id}`,
    };
}
