import { z } from 'zod';
import {
    PageBuilderBaseTypeSchema,
    PageBuilderType,
} from './PageBuilderBaseType';

export const StripePaymentFormTypeSchema = PageBuilderBaseTypeSchema.and(z.object({
    noTopSpace: z.boolean(),
    heading: z.string(),
    defaultAmount: z.string(),
}));

export type StripePaymentFormType = z.infer<typeof StripePaymentFormTypeSchema>;

export const stripePaymentFormDefaultData: StripePaymentFormType = {
    id: '',
    type: PageBuilderType.Content_ContactForm,
    typeName: 'Stripe Payment Form',
    isDisabled: false,
    internalName: '',
    noTopSpace: false,
    heading: '',
    defaultAmount: '',
};
