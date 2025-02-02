import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '../../../../layout/Layout';
import { GetEntryData } from './GetEntryData';
import { createPageTitle } from '../../../../createPageTitle';
import AccessDenied from '../../../../AccessDenied';
import PageClientSide from './PageClientSide';
import { ConfigOptions, getConfigString } from '../../../../serverSideRunTimeConfig';

type Params = {
    params: {
        blogPageId: string;
        entryId: string;
    };
};

export async function generateMetadata ({ params }: Params): Promise<Metadata> {
    const data = await GetEntryData(params.blogPageId, params.entryId);

    if (!data.userHasAccess) {
        return { title: createPageTitle('Access Denied') };
    }

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle([
            `Edit “${data.entry.name}”`,
            `${data.entry.blogPage.name} Entries`,
        ]),
    };
}

export default async function page ({ params }: Params) {
    const data = await GetEntryData(params.blogPageId, params.entryId);

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
                        value: `${data.entry.blogPage.name} Entries`,
                        href: `/blog-entries/${params.blogPageId}`,
                    },
                ],
                currentBreadcrumb: { value: 'Edit' },
            }}
        >
            <PageClientSide
                apiFeUrl={getConfigString(ConfigOptions.API_FE_URL)}
                initialData={data.entry}
            />
        </Layout>
    );
}
