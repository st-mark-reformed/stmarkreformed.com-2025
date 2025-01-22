import { z } from 'zod';

export const ProfileTypeSchema = z.object({
    id: z.string(),
    photo: z.string(),
    titleOrHonorific: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    firstAndLastName: z.string(),
    fullNameWithTitle: z.string(),
    email: z.string(),
    leadershipPosition: z.object({
        value: z.string(),
        humanReadable: z.string(),
    }),
    bio: z.string(),
    hasMessages: z.boolean(),
});

export type ProfileType = z.infer<typeof ProfileTypeSchema>;

export type ProfileTypeFrontEnd = ProfileType & {
    cmsHref: string;
};
