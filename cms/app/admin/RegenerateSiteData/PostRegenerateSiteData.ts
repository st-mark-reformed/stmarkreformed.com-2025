'use server';

import RequestMethods from 'rxante-oauth/dist/Request/RequestMethods';
import { ParseApiResponse } from '../../PersistenceResult';
import { RequestFactory } from '../../api/request/RequestFactory';

export default async function PostRegenerateSiteData () {
    const response = await RequestFactory().makeWithToken({
        uri: '/site-data/regenerate',
        method: RequestMethods.POST,
        cacheSeconds: 0,
    });

    return ParseApiResponse(response);
}
