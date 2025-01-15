import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GetBlogEntriesPageData } from './GetBlogEntriesPageData';
import AccessDenied from '../../AccessDenied';
import Layout from '../../layout/Layout';
import { createPageTitle } from '../../createPageTitle';
import PageClientSide from './PageClientSide';

type Params = {
    params: { blogPageId: string };
};

export async function generateMetadata ({ params }: Params): Promise<Metadata> {
    const data = await GetBlogEntriesPageData(params.blogPageId);

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

export default async function Page ({ params }: Params) {
    const data = await GetBlogEntriesPageData(params.blogPageId);

    if (!data.userHasAccess) {
        return <AccessDenied />;
    }

    if (data.notFound) {
        notFound();
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [
                    {
                        value: 'Pages',
                        href: '/pages',
                    },
                ],
                currentBreadcrumb: { value: 'Edit' },
            }}
        >
            <PageClientSide
                blogPage={data.data.blogPage}
            />
        </Layout>
    );
}
