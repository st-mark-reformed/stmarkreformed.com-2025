import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Url } from '../types/UrlType';

export type HeroProps = {
    useShortHero?: boolean;
    heroDarkeningOverlayOpacity?: number;
    heroImage?: string;
    heroUpperCta?: Url;
    heroHeading?: string;
    heroSubheading?: string;
    heroParagraph?: string;
};

export default function Hero (
    {
        hero,
    }: {
        hero: HeroProps;
    },
) {
    const hasParagraph = hero.heroSubheading || hero.heroParagraph;

    return (
        // sm:pt-16 lg:pt-8 lg:pb-16
        <div className="py-10 lg:overflow-hidden relative z-20">
            <div className="mx-auto max-w-7xl lg:px-8">
                <div className={hasParagraph ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}>
                    <div className={`mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 ${hasParagraph ? 'lg:text-left lg:flex lg:items-center' : ''}`}>
                        <div className={`${hero.heroUpperCta?.linkData && hero.heroUpperCta.linkText ? 'py-24' : 'py-6'}`}>
                            {(() => {
                                if (!hero.heroUpperCta?.linkText || !hero.heroUpperCta.linkData) {
                                    return null;
                                }

                                return (
                                    <Link
                                        href={hero.heroUpperCta.linkData}
                                        className="inline-flex items-center text-white bg-goldenrod rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:bg-gold"
                                    >
                                        <span className="ml-4 text-sm">{hero.heroUpperCta.linkText}</span>
                                        <ChevronRightIcon className="text-white ml-2 w-5 h-5" />
                                    </Link>
                                );
                            })()}
                            <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                <span className="block">{hero.heroHeading}</span>
                                {(() => {
                                    if (!hero.heroSubheading) {
                                        return null;
                                    }

                                    return (
                                        <span
                                            className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-200 sm:pb-5"
                                        >
                                            {hero.heroSubheading}
                                        </span>
                                    );
                                })()}
                            </h1>
                            {(() => {
                                if (!hero.heroParagraph) {
                                    return null;
                                }

                                return (
                                    <p className="pt-2 text-base text-gray-100 sm:text-xl lg:text-lg xl:text-xl">
                                        {hero.heroParagraph}
                                    </p>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
