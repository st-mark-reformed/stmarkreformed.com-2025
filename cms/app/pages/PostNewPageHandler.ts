'use server';

import { revalidateTag } from 'next/cache';
import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { RequestFactory } from '../api/request/RequestFactory';
import { ApiResponseResult, ApiResponseSchema, ApiResponseType } from '../PersistenceResult';

export default async function PostNewPageHandler (
    pageName: string,
): Promise<ApiResponseResult> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        method: RequestMethods.POST,
        payload: { pageName },
        cacheSeconds: 0,
    });

    if (response.status === 401 || response.status === 403) {
        return {
            userHasAccess: false,
            data: {
                success: false,
                messages: ['You do not have access to this resource'],
            },
        };
    }

    revalidateTag('pageData');

    ApiResponseSchema.parse(response.json);

    const data = response.json as ApiResponseType;

    return {
        userHasAccess: true,
        data,
    };
}
