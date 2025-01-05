import { PageBuilderBlockBase } from '../../../../types/PageBuilder';

export type StripePaymentFormBlockType = PageBuilderBlockBase & {
    noTopSpace: boolean;
    heading: string;
    defaultAmount: string;
    successRedirect: string;
};
