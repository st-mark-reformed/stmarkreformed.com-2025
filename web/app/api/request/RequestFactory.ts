import {
    RequestFactory as BaseRequestFactory,
    RefreshAccessTokenWithAuth0Factory,
    IoRedisRefreshLockFactory,
} from 'rxante-oauth';
import {
    ConfigOptions,
    getConfigString,
} from '../../serverSideRunTimeConfig';
import { TokenRepositoryFactory } from '../auth/TokenRepositoryFactory';
import getRedisClient from '../../cache/RedisClient';

export function RequestFactory () {
    const tokenRepository = TokenRepositoryFactory();

    return BaseRequestFactory({
        appUrl: getConfigString(ConfigOptions.APP_URL),
        requestBaseUrl: getConfigString(ConfigOptions.API_BASE_URL),
        tokenRepository,
        nextAuthProviderId: 'auth0',
        refreshAccessToken: RefreshAccessTokenWithAuth0Factory({
            tokenRepository,
            refreshLock: IoRedisRefreshLockFactory({
                redis: getRedisClient(),
            }),
            wellKnownUrl: getConfigString(
                ConfigOptions.FUSION_AUTH_WELL_KNOWN,
            ),
            clientId: getConfigString(
                ConfigOptions.FUSION_AUTH_CLIENT_ID,
            ),
            clientSecret: getConfigString(
                ConfigOptions.FUSION_AUTH_CLIENT_SECRET,
            ),
        }),
    });
}
