import React from 'react';
import { Metadata } from 'next';
import Layout from '../layout/Layout';
import PageClientSide from './PageClientSide';
import AccessDenied from '../AccessDenied';
import GetPagesData from './GetPagesData';
import { OverlappingUrisReportSuspense } from './OverlappingUrisReport/OverlappingUrisReportSuspense';
import { createPageTitle } from '../createPageTitle';

export const metadata: Metadata = {
    title: createPageTitle('Site Pages'),
};

export default async function Page () {
    const result = await GetPagesData();

    if (!result.userHasAccess) {
        return <AccessDenied />;
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [],
                currentBreadcrumb: { value: 'Pages' },
            }}
        >
            <PageClientSide pages={result.data}>
                <OverlappingUrisReportSuspense />
            </PageClientSide>
        </Layout>
    );
}
