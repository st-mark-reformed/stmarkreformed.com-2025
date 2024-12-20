import React from 'react';
import { Metadata } from 'next';
import Reorder from './Reorder';
import GetPagesData from '../GetPagesData';
import AccessDenied from '../../AccessDenied';
import Layout from '../../layout/Layout';
import { OverlappingUrisReportSuspense } from '../OverlappingUrisReport/OverlappingUrisReportSuspense';
import { createPageTitle } from '../../createPageTitle';

export const metadata: Metadata = {
    title: createPageTitle('Reorder Site Pages'),
};

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
                        value: 'Pages',
                        href: '/pages',
                    },
                ],
                currentBreadcrumb: { value: 'Reorder' },
            }}
        >
            <Reorder pages={result.data}>
                <OverlappingUrisReportSuspense />
            </Reorder>
        </Layout>
    );
}
