import React from 'react';
import { notFound } from 'next/navigation';
import { GetPageData } from './GetPageData';
import { DefaultPageParams } from './DefaultPageParams';

export default async function DefaultPage ({ params }: DefaultPageParams) {
    const data = await GetPageData(params.path.join('/'));

    if (data.notFound) {
        notFound();
    }

    return (
        <>{data.pageData.name}</>
    );
}
