import NextAuth from 'next-auth';
import {
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
    providers: [{
        wellKnown: getConfigString(
            ConfigOptions.FUSION_AUTH_WELL_KNOWN_URL,
        ),
        clientId: getConfigString(
            ConfigOptions.FUSION_AUTH_CLIENT_ID,
        ),
        clientSecret: getConfigString(
            ConfigOptions.FUSION_AUTH_CLIENT_SECRET,
        ),
        id: 'fusion-auth',
        name: 'FusionAuth',
        type: 'oauth',
        checks: ['state'],
        authorization: {
            params: { scope: 'openid profile email offline_access' }, // offline_access required for refresh tokens :/
        },
        httpOptions: {
            timeout: 30000,
        },
        userinfo: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async request ({ client, tokens }) {
                // Get base profile
                // noinspection UnnecessaryLocalVariableJS
                const profile = await client.userinfo(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    tokens,
                );

                console.log(profile);

                return profile;
            },
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        profile (profile) {
            if (!profile.name) {
                profile.name = `${profile.given_name} ${profile.family_name}`;
            }

            return {
                id: profile.sub,
                ...profile,
            };
        },
    }],
    secret: getConfigString(
        ConfigOptions.NEXTAUTH_SECRET,
    ),
    tokenRepository: TokenRepositoryFactory(),
}));

export { handler as GET, handler as POST };
