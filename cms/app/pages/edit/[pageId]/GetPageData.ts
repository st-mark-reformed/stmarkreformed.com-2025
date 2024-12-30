import { RequestFactory } from '../../../api/request/RequestFactory';
import {
    PageTypeWithDataNoChildren,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../../PageType';
import { TransformPageTypeWithDataNoChildren } from '../../PageTransformer';

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
    data: PageTypeWithDataNoChildrenFrontEnd;
};

export async function GetPageData (
    pageId: string,
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: `/pages/${pageId}`,
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

    const page = response.json as PageTypeWithDataNoChildren;

    return {
        userHasAccess: true,
        notFound: false,
        data: TransformPageTypeWithDataNoChildren(page),
    };
}
