'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { ParseApiResponse } from '../PersistenceResult';
import { RequestFactory } from '../api/request/RequestFactory';

export default async function DeleteProfiles (ids: Array<string>) {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: '/profiles/all-profiles',
        method: RequestMethods.DELETE,
        payload: { ids },
        cacheSeconds: 0,
    }));
}
