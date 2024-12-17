import React from 'react';
import Layout from '../layout/Layout';
import PageClientSide from './PageClientSide';
import AccessDenied from '../AccessDenied';
import GetPagesData from './GetPagesData';

export default async function Page () {
    const result = await GetPagesData();

    if (!result.userHasAccess) {
        return <AccessDenied />;
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [
                    {
                        value: 'CMS',
                        href: '/cms',
                    },
                ],
                currentBreadcrumb: { value: 'Pages' },
            }}
        >
            <PageClientSide pages={result.data} />
        </Layout>
    );
}
