import { RequestFactory } from '../api/request/RequestFactory';
import {
    PageTypeFrontEndNoDataArray,
    PageTypeNoDataArray,
    PageTypeNoDataArraySchema,
} from '../pages/PageType';
import { TransformPageTypeNoData } from '../pages/PageTransformer';

export default async function GetPhotoGalleryEntryPages (): Promise<PageTypeFrontEndNoDataArray> {
    try {
        const response = await RequestFactory().makeWithSignInRedirect({
            uri: '/pages/photo-gallery-entry-pages',
            cacheSeconds: 0,
            cacheTags: ['pageData'],
        });

        const pages = response.json as PageTypeNoDataArray;

        PageTypeNoDataArraySchema.parse(pages);

        return pages.map((page) => TransformPageTypeNoData(page));
    } catch (e) {
        return [];
    }
}
