import getRedisClient from '../cache/RedisClient';
import { GlobalContactForm, GlobalHeroDefaults } from '../types/GlobalType';
import { PageBaseType, PageStatus, PageType } from '../types/PageType';

type ResponseWith404 = {
    notFound: true;
};

type ResponseWithData = {
    notFound: false;
    globals: {
        heroDefaults: GlobalHeroDefaults;
        contactForm: GlobalContactForm;
    };
    pageData: PageBaseType;
};

export async function GetPageData (
    path: string,
): Promise<ResponseWith404 | ResponseWithData> {
    const redis = getRedisClient();

    const redisPageData = await redis.get(`static_page_data:${path}`);

    if (!redisPageData) {
        return { notFound: true };
    }

    const heroDefaults = JSON.parse(
        await redis.get('static_global_data:heroDefaults') ?? '{}',
    ) as GlobalHeroDefaults;
    heroDefaults.json.heroDarkeningOverlayOpacity = parseInt(
        heroDefaults.json.heroDarkeningOverlayOpacity.toString(),
        10,
    );

    const contactForm = JSON.parse(
        await redis.get('static_global_data:contactForm') ?? '{}',
    ) as GlobalContactForm;

    const pageData = JSON.parse(redisPageData) as PageBaseType;
    pageData.status = PageStatus[pageData.status];
    pageData.type = PageType[pageData.type];

    return {
        notFound: false,
        globals: {
            heroDefaults,
            contactForm,
        },
        pageData,
    };
}
