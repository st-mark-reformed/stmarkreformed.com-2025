import React from 'react';
import { notFound } from 'next/navigation';
import { GetAllPageData } from './GetPageData/GetAllPageData';
import { DefaultPageParams } from './DefaultPageParams';

export default async function DefaultPage ({ params }: DefaultPageParams) {
    const data = await GetAllPageData(params.path.join('/'));

    if (data.notFound) {
        notFound();
    }

    return (
        <>{data.pageData.name}</>
    );
}
