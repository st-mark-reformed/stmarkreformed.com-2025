import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '../../../layout/Layout';
import AccessDenied from '../../../AccessDenied';
import { GetPageData } from './GetPageData';
import PageClientSide from './PageClientSide';
import { ConfigOptions, getConfigString } from '../../../serverSideRunTimeConfig';
import { createPageTitle } from '../../../createPageTitle';

type Params = {
    params: { pageId: string };
};

export async function generateMetadata ({ params }: Params): Promise<Metadata> {
    const data = await GetPageData(params.pageId);

    if (!data.userHasAccess) {
        return { title: createPageTitle('Access Denied') };
    }

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle([
            `Edit “${data.data.name}”`,
            'Site Pages',
        ]),
    };
}

export default async function Page (
    {
        params,
    }: Params,
) {
    const data = await GetPageData(params.pageId);

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
                apiFeUrl={getConfigString(ConfigOptions.API_FE_URL)}
                initialData={data.data}
            />
        </Layout>
    );
}
