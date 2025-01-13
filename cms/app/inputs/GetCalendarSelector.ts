'use server';

import { z } from 'zod';
import { RequestFactory } from '../api/request/RequestFactory';

const OptionSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export type Option = z.infer<typeof OptionSchema>;

const OptionsSchema = z.array(OptionSchema);

export type Options = z.infer<typeof OptionsSchema>;

export default async function GetCalendarSelector (): Promise<Options> {
    const response = await RequestFactory().makeWithToken({
        uri: '/calendar/select-options',
        cacheTags: ['pageData'],
    });

    OptionsSchema.parse(response.json);

    return response.json as Options;
}
