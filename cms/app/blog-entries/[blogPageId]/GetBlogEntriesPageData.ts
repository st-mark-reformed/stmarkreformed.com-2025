import {
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../../pages/PageType';
import { RequestFactory } from '../../api/request/RequestFactory';
import { TransformPageTypeWithDataNoChildren } from '../../pages/PageTransformer';

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
        entries: Array<never>;
    };
};

export async function GetBlogEntriesPageData (
    blogPageId: string,
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: `/pages/blog-entries-page/${blogPageId}`,
        cacheSeconds: 5,
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

    return {
        userHasAccess: true,
        notFound: false,
        data: {
            blogPage: TransformPageTypeWithDataNoChildren(blogPage),
            entries: [],
        },
    };
}
