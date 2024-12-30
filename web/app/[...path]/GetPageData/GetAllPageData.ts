import { ResponseWith404, ResponseWithAllData } from './ResponseTypes';
import { GetStaticPageData } from './GetStaticPageData';
import { GetStaticGlobals } from './GetStaticGlobals';
import { GetStaticMenuData } from './GetStaticMenuData';

export async function GetAllPageData (
    path: string,
): Promise<ResponseWith404 | ResponseWithAllData> {
    const pageData = await GetStaticPageData(path);

    if (!pageData) {
        return { notFound: true };
    }

    return {
        notFound: false,
        menu: await GetStaticMenuData(),
        globals: await GetStaticGlobals(),
        pageData,
    };
}
