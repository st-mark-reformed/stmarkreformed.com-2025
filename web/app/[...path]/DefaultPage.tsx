import React from 'react';
import { notFound } from 'next/navigation';
import { GetAllPageData } from './GetPageData/GetAllPageData';
import { DefaultPageParams } from './DefaultPageParams';
import Layout from '../layout/Layout';

export default async function DefaultPage ({ params }: DefaultPageParams) {
    const data = await GetAllPageData(params.path.join('/'));

    if (data.notFound) {
        notFound();
    }

    return (
        <Layout
            menu={data.menu}
            globals={data.globals}
            hero={{
                useCustomHero: data.pageData.useCustomHero,
                heroDarkeningOverlayOpacity: data.pageData.heroDarkeningOverlayOpacity,
                heroImage: data.pageData.heroImage,
            }}
            heroControls={{
                useShortHero: data.pageData.useShortHero,
                heroUpperCta: data.pageData.heroUpperCta,
                heroHeading: data.pageData.heroHeading,
                heroSubheading: data.pageData.heroSubheading,
                heroParagraph: data.pageData.heroParagraph,
            }}
        >
            {data.pageData.name}
        </Layout>
    );
}
