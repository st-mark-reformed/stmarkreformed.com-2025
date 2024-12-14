import NextAuth from 'next-auth';
import {
    NextAuthFusionAuthProviderFactory,
    NextAuthOptionsConfigFactory,
} from 'rxante-oauth';
import {
    ConfigOptions,
    getConfigBoolean,
    getConfigString,
} from '../../../serverSideRunTimeConfig';
import { TokenRepositoryFactory } from '../TokenRepositoryFactory';

const handler = NextAuth(NextAuthOptionsConfigFactory({
    debug: getConfigBoolean(ConfigOptions.DEV_MODE),
    providers: [NextAuthFusionAuthProviderFactory({
        wellKnownUrl: getConfigString(
            ConfigOptions.FUSION_AUTH_WELL_KNOWN_URL,
        ),
        clientId: getConfigString(
            ConfigOptions.FUSION_AUTH_CLIENT_ID,
        ),
        clientSecret: getConfigString(
            ConfigOptions.FUSION_AUTH_CLIENT_SECRET,
        ),
    })],
    secret: getConfigString(
        ConfigOptions.NEXTAUTH_SECRET,
    ),
    tokenRepository: TokenRepositoryFactory(),
}));

export { handler as GET, handler as POST };
