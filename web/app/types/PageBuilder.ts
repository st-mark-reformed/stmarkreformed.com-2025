export type PageBuilderBlockBase = {
    id: string;
    type: 'Content_BasicBlock'
    | 'Content_ContactForm'
    | 'CTAs_SimpleCta'
    | 'CTAs_ImageContentCta'
    | 'Content_StripePaymentForm'
    | 'Features_UpcomingEvents';
    typeName: string;
    isDisabled: boolean;
    internalName: string;
};
