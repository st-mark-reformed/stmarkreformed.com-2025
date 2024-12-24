import { z } from 'zod';

export const TextInputsSchema = z.object({
    id: z.string(),
    value: z.string(),
});

export type TextInputsType = z.infer<typeof TextInputsSchema>;
