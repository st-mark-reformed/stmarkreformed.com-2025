import React from 'react';
import Layout from '../../../layout/Layout';
import AccessDenied from '../../../AccessDenied';
import { GetPageData } from './GetPageData';
import NotFound from '../../../not-found';

export default async function Page (
    {
        params,
    }: {
        params: { pageId: string };
    },
) {
    const data = await GetPageData(params.pageId);

    if (!data.userHasAccess) {
        return <AccessDenied />;
    }

    if (data.notFound) {
        return <NotFound />;
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
            TODO
        </Layout>
    );
}
