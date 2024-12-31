import React from 'react';
import { notFound } from 'next/navigation';
import { GetAllPageData } from './GetPageData/GetAllPageData';
import { DefaultPageParams } from './DefaultPageParams';
import Layout from '../layout/Layout';
import PageTypeFactory from './PageTypes/PageTypeFactory';
import PageTypeWrapper from './PageTypeWrapper';

export default async function DefaultPage ({ params }: DefaultPageParams) {
    const segment1 = params.path[0] ?? '';

    const path = params.path.join('/');

    const data = await GetAllPageData(path);

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
            <PageTypeWrapper
                data={data}
                segment1={segment1}
                path={path}
            >
                <PageTypeFactory pageData={data.pageData} />
            </PageTypeWrapper>
        </Layout>
    );
}
