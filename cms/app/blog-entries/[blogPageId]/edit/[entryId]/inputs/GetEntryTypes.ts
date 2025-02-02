'use server';

import { RequestFactory } from '../../../../../api/request/RequestFactory';

export type Option = {
    type: string;
    name: string;
};

export type Options = Array<Option>;

export default async function GetEntryTypes (): Promise<Options> {
    const response = await RequestFactory().makeWithToken({
        uri: '/blog-entries/types',
        cacheTags: ['pageData'],
        cacheSeconds: 0,
    });

    return response.json as Options;
}
