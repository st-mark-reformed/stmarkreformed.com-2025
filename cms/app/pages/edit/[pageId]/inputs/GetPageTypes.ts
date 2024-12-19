'use server';

import { z } from 'zod';
import { RequestFactory } from '../../../../api/request/RequestFactory';

const OptionSchema = z.object({
    type: z.string(),
    name: z.string(),
});

export type Option = z.infer<typeof OptionSchema>;

const OptionsSchema = z.array(OptionSchema);

export type Options = z.infer<typeof OptionsSchema>;

export default async function GetPageTypes (): Promise<Options> {
    const response = await RequestFactory().makeWithToken({
        uri: '/pages/types',
        cacheTags: ['pageData'],
    });

    OptionsSchema.parse(response.json);

    return response.json as Options;
}
