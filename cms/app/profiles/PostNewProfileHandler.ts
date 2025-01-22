'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { RequestFactory } from '../api/request/RequestFactory';
import {
    ApiResponseResult,
    ParseApiResponse,
} from '../PersistenceResult';

export type ProfileData = {
    firstName: string;
    lastName: string;
};

export default async function PostNewProfileHandler (
    profileData: ProfileData,
): Promise<ApiResponseResult> {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: '/profiles/all-profiles',
        method: RequestMethods.POST,
        payload: profileData,
        cacheSeconds: 0,
    }));
}
