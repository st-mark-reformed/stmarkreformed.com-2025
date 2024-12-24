'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { RequestFactory } from '../api/request/RequestFactory';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../PersistenceResult';

export default async function PostNewPageHandler (
    pageName: string,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        method: RequestMethods.POST,
        payload: { pageName },
        cacheSeconds: 0,
    }));
}
