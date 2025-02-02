import {
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../../pages/PageType';
import { RequestFactory } from '../../api/request/RequestFactory';
import { TransformPageTypeWithDataNoChildren } from '../../pages/PageTransformer';
import { EntryType, EntryTypeFrontEnd, TransformEntry } from '../EntryType';

function isInteger (str: string | string[]): boolean {
    if (!(typeof str === 'string')) {
        return false;
    }

    return /^-?\d+$/.test(str);
}

type ResponseNoAccess = {
    userHasAccess: false;
    notFound: false;
};

type ResponseWith404 = {
    userHasAccess: true;
    notFound: true;
};

type ResponseWithAccess = {
    userHasAccess: true;
    notFound: false;
    data: {
        blogPage: PageTypeWithDataNoChildrenFrontEnd;
        entries: Array<EntryTypeFrontEnd>;
    };
};

export async function GetBlogEntriesPageData (
    blogPageId: string,
    searchParams: { [key: string]: string | string[] },
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const notFoundResponse: ResponseWith404 = {
        userHasAccess: true,
        notFound: true,
    };

    const { page } = searchParams;

    if (page !== undefined && (!isInteger(page) || page === '1')) {
        return notFoundResponse;
    }

    const pageInt = typeof page === 'string' ? parseInt(page, 10) : 1;

    if (pageInt < 1) {
        return notFoundResponse;
    }

    const queryParams = new URLSearchParams();

    if (pageInt) {
        queryParams.append('page', pageInt.toString());
    }

    const response = await RequestFactory().makeWithSignInRedirect({
        uri: `/blog-entries/${blogPageId}`,
        queryParams,
        cacheSeconds: 0,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return {
            userHasAccess: false,
            notFound: false,
        };
    }

    if (response.status === 404) {
        return {
            userHasAccess: true,
            notFound: true,
        };
    }

    // @ts-expect-error TS2339
    const blogPage = response.json.blogPage as PageTypeWithDataNoChildren;

    // @ts-expect-error TS2339
    const entries = response.json.entries as Array<EntryType>;

    return {
        userHasAccess: true,
        notFound: false,
        data: {
            blogPage: TransformPageTypeWithDataNoChildren(blogPage),
            entries: entries.map((entry) => TransformEntry(entry)),
        },
    };
}
