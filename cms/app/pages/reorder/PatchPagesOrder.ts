'use server';

import { revalidateTag } from 'next/cache';
import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { SortableItems } from './SortableItem';
import { ApiResponseResult, ApiResponseSchema, ApiResponseType } from '../../PersistenceResult';
import { RequestFactory } from '../../api/request/RequestFactory';

export default async function PatchPagesOrder (
    items: SortableItems,
): Promise<ApiResponseResult> {
    const response = await RequestFactory().makeWithToken({
        uri: '/pages/all-pages',
        method: RequestMethods.PATCH,
        payload: items,
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
