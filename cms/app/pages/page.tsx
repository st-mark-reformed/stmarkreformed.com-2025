import React from 'react';
import Layout from '../layout/Layout';
import PageClientSide from './PageClientSide';

export default async function Page () {
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
            <PageClientSide />
        </Layout>
    );
}
