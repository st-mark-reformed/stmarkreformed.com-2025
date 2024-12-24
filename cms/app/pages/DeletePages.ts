'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { ParseApiResponse } from '../PersistenceResult';
import { RequestFactory } from '../api/request/RequestFactory';

export default async function DeletePages (ids: Array<string>) {
    return ParseApiResponse(await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        method: RequestMethods.DELETE,
        payload: { ids },
        cacheSeconds: 0,
    }));
}
