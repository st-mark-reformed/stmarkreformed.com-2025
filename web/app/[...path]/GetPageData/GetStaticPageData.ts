import getRedisClient from '../../cache/RedisClient';
import { PageBaseType, PageStatus, PageType } from '../../types/PageType';

export async function GetStaticPageData (
    path: string,
): Promise<PageBaseType | null> {
    const redis = getRedisClient();

    const redisPageData = await redis.get(`static_page_data:${path}`);

    if (!redisPageData) {
        return null;
    }

    const pageData = JSON.parse(redisPageData) as PageBaseType;
    pageData.status = PageStatus[pageData.status];
    pageData.type = PageType[pageData.type];

    return pageData;
}
