import { z } from 'zod';
import { RequestResponse } from 'rxante-oauth/src/Request/RequestResponse';
import { revalidateTag } from 'next/cache';

export const ApiResponseSchema = z.object({
    success: z.boolean(),
    messages: z.array(z.string()),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;

export type ApiResponseResult = {
    userHasAccess: boolean;
    data: ApiResponseType;
};

export function ParseApiResponse (response: RequestResponse): ApiResponseResult {
    if (response.status === 401 || response.status === 403) {
        return {
            userHasAccess: false,
            data: {
                success: false,
                messages: ['You do not have access to this resource'],
            },
        };
    }

    revalidateTag('pageData');

    try {
        ApiResponseSchema.parse(response.json);
    } catch (error) {
        return {
            userHasAccess: true,
            data: {
                success: false,
                messages: ['An unknown error occurred'],
            },
        };
    }

    const data = response.json as ApiResponseType;

    return {
        userHasAccess: true,
        data,
    };
}
