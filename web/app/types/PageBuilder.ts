export type PageBuilderBlockBase = {
    id: string;
    type: 'Content_BasicBlock' |
    'Content_ContactForm';
    typeName: string;
    isDisabled: boolean;
    internalName: string;
};
