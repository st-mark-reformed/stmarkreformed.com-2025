'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { GlobalType } from '../../GlobalType';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../../PersistenceResult';
import { RequestFactory } from '../../../api/request/RequestFactory';

export default async function PatchGlobal (
    payload: GlobalType,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithToken({
        uri: '/globals/all',
        method: RequestMethods.PATCH,
        cacheSeconds: 0,
        payload,
    }));
}
