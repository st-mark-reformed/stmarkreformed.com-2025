'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../../../PersistenceResult';
import { RequestFactory } from '../../../../api/request/RequestFactory';
import { SubmissionData } from './useDataManager';

export default async function PatchEntry (
    entry: Omit<SubmissionData, 'datePublished'> & {
        datePublished: string | null;
    },
): Promise<ApiResponseResult> {
    console.log(entry);

    return ParseApiResponse(await RequestFactory().makeWithToken({
        uri: `/pages/${entry.id}`,
        method: RequestMethods.PATCH,
        payload: entry,
        cacheSeconds: 0,
    }));
}
