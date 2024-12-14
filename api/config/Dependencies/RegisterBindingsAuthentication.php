<?php

declare(strict_types=1);

namespace Config\Dependencies;

use Config\RuntimeConfig;
use Config\RuntimeConfigOptions;
use League\OAuth2\Client\Provider\AbstractProvider;
use Psr\Container\ContainerInterface;
use RxAnte\AppBootstrap\Dependencies\Bindings;
use RxAnte\OAuth\Handlers\FusionAuth\FusionAuthConfig;
use RxAnte\OAuth\Handlers\FusionAuth\FusionAuthLeagueOauthProviderConfig;
use RxAnte\OAuth\Handlers\FusionAuth\FusionAuthLeagueOauthProviderFactory;
use RxAnte\OAuth\Handlers\FusionAuth\FusionAuthUserInfoRepository;
use RxAnte\OAuth\Handlers\FusionAuth\TokenRefresh\GetRefreshedAccessTokenFromFusionAuth;
use RxAnte\OAuth\TokenRepository\Refresh\GetRefreshedAccessToken;
use RxAnte\OAuth\TokenRepository\Refresh\Lock\RedisRefreshLock;
use RxAnte\OAuth\TokenRepository\Refresh\Lock\RefreshLock;
use RxAnte\OAuth\TokenRepository\TokenRepositoryConfig;
use RxAnte\OAuth\UserInfo\OauthUserInfoRepositoryInterface;

use function assert;

readonly class RegisterBindingsAuthentication
{
    public static function register(Bindings $bindings): void
    {
        $bindings->addBinding(
            OauthUserInfoRepositoryInterface::class,
            $bindings->resolveFromContainer(
                FusionAuthUserInfoRepository::class,
            ),
        );

        $bindings->addBinding(
            RefreshLock::class,
            $bindings->resolveFromContainer(RedisRefreshLock::class),
        );

        $bindings->addBinding(
            FusionAuthConfig::class,
            static function (ContainerInterface $container): FusionAuthConfig {
                $runtimeConfig = $container->get(RuntimeConfig::class);
                assert($runtimeConfig instanceof RuntimeConfig);

                return new FusionAuthConfig(
                    wellKnownUrl: $runtimeConfig->getString(
                        RuntimeConfigOptions::FUSION_AUTH_WELL_KNOWN_URL,
                    ),
                    sslVerify: $runtimeConfig->getBoolean(
                        RuntimeConfigOptions::FUSION_AUTH_SSL_VERIFY,
                    ),
                    signingCertificate: $runtimeConfig->getString(
                        RuntimeConfigOptions::FUSION_AUTH_SIGNING_CERTIFICATE,
                    ),
                );
            },
        );

        $bindings->addBinding(
            FusionAuthLeagueOauthProviderConfig::class,
            static function (ContainerInterface $container): FusionAuthLeagueOauthProviderConfig {
                $runtimeConfig = $container->get(RuntimeConfig::class);
                assert($runtimeConfig instanceof RuntimeConfig);

                return new FusionAuthLeagueOauthProviderConfig(
                    clientId: $runtimeConfig->getString(
                        RuntimeConfigOptions::FUSION_AUTH_CLIENT_ID,
                    ),
                    clientSecret: $runtimeConfig->getString(
                        RuntimeConfigOptions::FUSION_AUTH_CLIENT_SECRET,
                    ),
                    callbackDomain: $runtimeConfig->getString(
                        RuntimeConfigOptions::FUSION_AUTH_CALLBACK_DOMAIN,
                    ),
                );
            },
        );

        $bindings->addBinding(
            AbstractProvider::class,
            static function (ContainerInterface $container): AbstractProvider {
                $factory = $container->get(FusionAuthLeagueOauthProviderFactory::class);
                assert($factory instanceof FusionAuthLeagueOauthProviderFactory);

                return $factory->create();
            },
        );

        $bindings->addBinding(
            TokenRepositoryConfig::class,
            static function (): TokenRepositoryConfig {
                return new TokenRepositoryConfig(
                    /**
                     * 4800 seconds is 80 minutes, which is how long refresh
                     * tokens are set for in FusionAuth: see Tenants >
                     * stmarkreformed.com > Edit > Refresh Token settings >
                     * Duration. Unfortunately this knowledge isn't available in
                     * the token, we just have to know it as a magic value here,
                     * which means if we ever change it there… ¯\_(ツ)_/¯
                     */
                    expireInSeconds: 4800,
                );
            },
        );

        $bindings->addBinding(
            GetRefreshedAccessToken::class,
            $bindings->resolveFromContainer(
                GetRefreshedAccessTokenFromFusionAuth::class,
            ),
        );
    }
}
