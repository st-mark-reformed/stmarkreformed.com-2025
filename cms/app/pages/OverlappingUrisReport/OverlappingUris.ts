import { z } from 'zod';

export const OverlappingUriSchema = z.object({
    uri: z.string(),
    count: z.number(),
});

export type OverlappingUri = z.infer<typeof OverlappingUriSchema>;

export const OverlappingUrisSchema = z.array(OverlappingUriSchema);

export type OverlappingUris = z.infer<typeof OverlappingUrisSchema>;
