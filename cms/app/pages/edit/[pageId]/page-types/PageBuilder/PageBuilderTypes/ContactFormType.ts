import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const ContactFormTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    content: z.string(),
    successRedirect: z.string(),
}));

export type ContactFormType = z.infer<typeof ContactFormTypeSchema>;

export const contactFormDefaultData: ContactFormType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Contact Form',
    internalName: '',
    content: '',
    successRedirect: '',
};
