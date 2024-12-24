import { z } from 'zod';

export const GlobalTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    json: z.union([
        z.array(z.any()),
        z.object({}).passthrough(),
    ]),
});

export type GlobalType = z.infer<typeof GlobalTypeSchema>;

export const GlobalsSchema = z.array(GlobalTypeSchema);

export type GlobalsType = z.infer<typeof GlobalsSchema>;
