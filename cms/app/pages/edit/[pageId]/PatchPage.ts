'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../../PersistenceResult';
import { PageTypeWithDataNoChildren } from '../../PageType';
import { RequestFactory } from '../../../api/request/RequestFactory';

export default async function PatchPage (
    page: PageTypeWithDataNoChildren,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithToken({
        uri: `/pages/${page.id}`,
        method: RequestMethods.PATCH,
        payload: page,
        cacheSeconds: 0,
    }));
}
