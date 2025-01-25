'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../../../PersistenceResult';
import { RequestFactory } from '../../../api/request/RequestFactory';
import { ProfileTypeFrontEnd } from '../../ProfileType';

export default async function PatchProfile (
    profile: ProfileTypeFrontEnd,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithToken({
        uri: `/profiles/${profile.id}`,
        method: RequestMethods.PATCH,
        payload: profile,
        cacheSeconds: 0,
    }));
}
