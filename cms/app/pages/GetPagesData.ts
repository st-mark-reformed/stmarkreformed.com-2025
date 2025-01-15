import { RequestFactory } from '../api/request/RequestFactory';
import { PageTypeFrontEndNoDataArray, PageTypeNoDataArray } from './PageType';
import { TransformPageTypeNoData } from './PageTransformer';

type ResponseNoAccess = {
    userHasAccess: false;
};

type ResponseWithAccess = {
    userHasAccess: true;
    data: PageTypeFrontEndNoDataArray;
};

export default async function GetPagesData (): Promise<
ResponseNoAccess | ResponseWithAccess
> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        cacheSeconds: 0,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return { userHasAccess: false };
    }

    const pages = response.json as PageTypeNoDataArray;

    return {
        userHasAccess: true,
        data: pages.map((page) => TransformPageTypeNoData(page)),
    };
}
