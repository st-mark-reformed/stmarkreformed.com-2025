// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React, { ReactNode } from 'react';
import { GetStaticMenuData } from '../[...path]/GetPageData/GetStaticMenuData';
import { MenuItems } from '../types/MenuType';
import { AllGlobals } from '../types/GlobalType';
import { GetStaticGlobals } from '../[...path]/GetPageData/GetStaticGlobals';
import Footer from './Footer';
import Hero, { HeroProps } from './Hero';
import { Url } from '../types/UrlType';
import Nav from './Nav';

export default async function Layout (
    {
        children,
        menu = null,
        globals = null,
        hero = null,
        heroControls,
    }: {
        children: ReactNode;
        menu?: MenuItems | null;
        globals?: AllGlobals | null;
        hero?: null | {
            useCustomHero: boolean;
            heroDarkeningOverlayOpacity: number;
            heroImage: string;
            heroImage1x: string;
            heroImage2x: string;
        };
        heroControls?: {
            useShortHero?: boolean;
            heroUpperCta?: Url;
            heroHeading?: string;
            heroSubheading?: string;
            heroParagraph?: string;
        };
    },
) {
    if (!menu) {
        menu = await GetStaticMenuData();
    }

    if (!globals) {
        globals = await GetStaticGlobals();
    }

    if (!hero?.useCustomHero) {
        hero = {
            useCustomHero: false,
            ...globals.heroDefaults.json,
        };
    }

    const heroProps: HeroProps = {
        ...hero,
        ...heroControls,
    };

    return (
        <>
            {(() => {
                if (!hero.heroImage1x || !hero.heroImage2x) {
                    return null;
                }

                return (
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                .hero-background-image {
                                    background-image: url('${hero.heroImage1x}');
                                    background-attachment: fixed;
                                }

                                @media (-webkit-min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx) {
                                    .hero-background-image {
                                        background-image: url('${hero.heroImage2x}');
                                    }
                                }

                                @media (hover: none) {
                                    .hero-background-image {
                                        background-attachment: initial;
                                    }
                                }
                            `,
                        }}
                    />
                );
            })()}
            <div className="h-full bg-bronze">
                <div className="bg-white">
                    <div className="relative overflow-hidden">
                        <div className="hero-background-image bg-bronze bg-cover bg-no-repeat bg-center relative z-50">
                            {(() => {
                                const opacity = hero.heroDarkeningOverlayOpacity;

                                if (opacity < 0) {
                                    return null;
                                }

                                return (
                                    <div
                                        className="absolute w-full h-full inset-0 z-10 bg-black"
                                        style={{
                                            opacity: opacity / 100,
                                        }}
                                    />
                                );
                            })()}
                            <header className="relative z-50">
                                <Nav menu={menu} />
                            </header>
                            <Hero hero={heroProps} />
                        </div>
                        <main className="relative z-10">
                            {children}
                        </main>
                        <Footer menu={menu} />
                    </div>
                </div>
            </div>
        </>
    );
}
