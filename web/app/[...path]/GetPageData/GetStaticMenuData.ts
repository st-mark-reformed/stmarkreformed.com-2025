import getRedisClient from '../../cache/RedisClient';
import { MenuItems } from '../../types/MenuType';

export async function GetStaticMenuData (): Promise<MenuItems> {
    const redis = getRedisClient();

    return JSON.parse(
        await redis.get('static_menu_data') ?? '[]',
    ) as MenuItems;
}
