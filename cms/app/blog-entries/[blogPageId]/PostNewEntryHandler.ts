'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { RequestFactory } from '../../api/request/RequestFactory';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../PersistenceResult';

export default async function PostNewEntryHandler (
    blogPageId: string,
    entryName: string,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: `/blog-entries/${blogPageId}`,
        method: RequestMethods.POST,
        payload: { entryName },
        cacheSeconds: 0,
    }));
}
