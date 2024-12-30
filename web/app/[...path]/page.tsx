import React from 'react';
import { Metadata } from 'next';
import { GetPageData } from './GetPageData';
import { createPageTitle } from '../createPageTitle';
import DefaultPage from './DefaultPage';
import { DefaultPageParams } from './DefaultPageParams';

export async function generateMetadata (
    { params }: DefaultPageParams,
): Promise<Metadata> {
    const data = await GetPageData(params.path.join('/'));

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle(data.pageData.name),
    };
}

export default async function Page ({ params }: DefaultPageParams) {
    return <DefaultPage params={params} />;
}
