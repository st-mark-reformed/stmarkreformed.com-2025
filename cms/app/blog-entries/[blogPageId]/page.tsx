import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GetBlogEntriesPageData } from './GetBlogEntriesPageData';
import AccessDenied from '../../AccessDenied';
import Layout, { InnerMaxWidth } from '../../layout/Layout';
import { createPageTitle } from '../../createPageTitle';
import PageClientSide from './PageClientSide';

type Params = {
    params: { blogPageId: string };
    searchParams: { [key: string]: string | string[] };
};

export async function generateMetadata (
    {
        params,
        searchParams,
    }: Params,
): Promise<Metadata> {
    const data = await GetBlogEntriesPageData(params.blogPageId, searchParams);

    if (!data.userHasAccess) {
        return { title: createPageTitle('Access Denied') };
    }

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle(`${data.data.blogPage.name} Entries`),
    };
}

export default async function Page (
    {
        params,
        searchParams,
    }: Params,
) {
    const data = await GetBlogEntriesPageData(params.blogPageId, searchParams);

    if (!data.userHasAccess) {
        return <AccessDenied />;
    }

    if (data.notFound) {
        notFound();
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [],
                currentBreadcrumb: { value: `${data.data.blogPage.name} Entries` },
            }}
            innerMaxWidth={InnerMaxWidth.small}
        >
            <PageClientSide
                blogPage={data.data.blogPage}
                entries={data.data.entries}
            />
        </Layout>
    );
}
