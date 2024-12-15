import { z } from 'zod';

export const ApiResponseSchema = z.object({
    success: z.boolean(),
    messages: z.array(z.string()),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;

export type ApiResponseResult = {
    userHasAccess: boolean;
    data: ApiResponseType;
};
