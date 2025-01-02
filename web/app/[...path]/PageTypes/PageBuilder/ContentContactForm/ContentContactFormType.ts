import { PageBuilderBlockBase } from '../../../../types/PageBuilder';

export type ContentContactFormType = PageBuilderBlockBase & {
    content: string;
    successRedirect: string;
};

export type FormValues = {
    aPassword?: string;
    yourCompany?: string;
    fromUrl?: string;
    name?: string;
    emailAddress?: string;
    message?: string;
};
