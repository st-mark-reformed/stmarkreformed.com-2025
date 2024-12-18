'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { revalidateTag } from 'next/cache';
import { ApiResponseSchema, ApiResponseType } from '../PersistenceResult';
import { RequestFactory } from '../api/request/RequestFactory';

export default async function DeletePages (ids: Array<string>) {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        method: RequestMethods.DELETE,
        payload: { ids },
        cacheSeconds: 0,
    });

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
