'use server';

import { revalidateTag } from 'next/cache';
import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import {
    ApiResponseResult,
    ApiResponseSchema,
    ApiResponseType,
} from '../../../PersistenceResult';
import { PageTypeWithDataNoChildren } from '../../PageType';
import { RequestFactory } from '../../../api/request/RequestFactory';

export default async function PatchPage (
    page: PageTypeWithDataNoChildren,
): Promise<ApiResponseResult> {
    const response = await RequestFactory().makeWithToken({
        uri: `/pages/${page.id}`,
        method: RequestMethods.PATCH,
        payload: page,
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

    try {
        ApiResponseSchema.parse(response.json);
    } catch (error) {
        return {
            userHasAccess: true,
            data: {
                success: false,
                messages: ['An unknown error occurred'],
            },
        };
    }

    const data = response.json as ApiResponseType;

    return {
        userHasAccess: true,
        data,
    };
}
