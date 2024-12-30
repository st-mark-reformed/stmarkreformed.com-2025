import getRedisClient from '../../cache/RedisClient';
import { AllGlobals, GlobalContactForm, GlobalHeroDefaults } from '../../types/GlobalType';
import { ConfigOptions, getConfigString } from '../../serverSideRunTimeConfig';

export async function GetStaticGlobals (): Promise<AllGlobals> {
    const redis = getRedisClient();

    const heroDefaults = JSON.parse(
        await redis.get('static_global_data:heroDefaults') ?? '{}',
    ) as GlobalHeroDefaults;

    heroDefaults.json.heroDarkeningOverlayOpacity = parseInt(
        heroDefaults.json.heroDarkeningOverlayOpacity.toString(),
        10,
    );

    heroDefaults.json.heroImage = getConfigString(
        ConfigOptions.API_FE_URL,
    ) + heroDefaults.json.heroImage;

    const contactForm = JSON.parse(
        await redis.get('static_global_data:contactForm') ?? '{}',
    ) as GlobalContactForm;

    return {
        heroDefaults,
        contactForm,
    };
}
