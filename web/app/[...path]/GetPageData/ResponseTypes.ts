import { AllGlobals } from '../../types/GlobalType';
import { PageBaseType } from '../../types/PageType';
import { MenuItems } from '../../types/MenuType';

export type ResponseWith404 = {
    notFound: true;
};

export type ResponseWithAllData = {
    notFound: false;
    menu: MenuItems;
    globals: AllGlobals;
    pageData: PageBaseType;
};
