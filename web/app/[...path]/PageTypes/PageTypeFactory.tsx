import React from 'react';
import { PageBaseType, PageType } from '../../types/PageType';
import Page from './Page';
import PageBuilderFactory from './PageBuilder/PageBuilderFactory';
import Calendar from './Calendar/Calendar';
import BlogEntries from './BlogEntries/BlogEntries';

export default async function PageTypeFactory (
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

    if (pageData.type === PageType.calendar) {
        return <Calendar pageData={pageData} />;
    }

    if (pageData.type === PageType.blog_entries) {
        return <BlogEntries pageData={pageData} />;
    }

    return <>{pageData.type}</>;
}
