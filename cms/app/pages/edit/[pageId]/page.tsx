import React from 'react';
import Layout from '../../../layout/Layout';
import AccessDenied from '../../../AccessDenied';
import { GetPageData } from './GetPageData';
import NotFound from '../../../not-found';
import PageClientSide from './PageClientSide';
import { ConfigOptions, getConfigString } from '../../../serverSideRunTimeConfig';

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

    console.log(data.data);

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
