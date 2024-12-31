import React from 'react';
import { PageBaseType, PageType } from '../../types/PageType';
import Page from './Page';
import PageBuilderFactory from './PageBuilder/PageBuilderFactory';

export default function PageTypeFactory (
    {
        pageData,
    }: {
        pageData: PageBaseType;
    },
) {
    if (pageData.type === PageType.page) {
        return <Page pageData={pageData} />;
    }

    if (pageData.type === PageType.page_builder) {
        return <PageBuilderFactory pageData={pageData} />;
    }

    return null;
}
