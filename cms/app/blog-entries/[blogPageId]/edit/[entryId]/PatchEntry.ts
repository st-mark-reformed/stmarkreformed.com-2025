'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../../../PersistenceResult';
import { RequestFactory } from '../../../../api/request/RequestFactory';
import { SubmissionData } from './useDataManager';

export default async function PatchEntry (
    blogPageId: string,
    entry: Omit<SubmissionData, 'datePublished'> & {
        datePublished: string | null;
    },
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithToken({
        uri: `/blog-entries/${blogPageId}/edit/${entry.id}`,
        method: RequestMethods.PATCH,
        payload: entry,
        cacheSeconds: 0,
    }));
}
