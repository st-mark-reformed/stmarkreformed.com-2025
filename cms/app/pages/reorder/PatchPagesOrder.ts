'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { SortableItems } from './SortableItem';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../PersistenceResult';
import { RequestFactory } from '../../api/request/RequestFactory';

export default async function PatchPagesOrder (
    items: SortableItems,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        method: RequestMethods.PATCH,
        payload: items,
        cacheSeconds: 0,
    }));
}
