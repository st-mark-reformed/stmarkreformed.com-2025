import React from 'react';
import Reorder from './Reorder';
import GetPagesData from '../GetPagesData';
import AccessDenied from '../../AccessDenied';
import Layout from '../../layout/Layout';
import { OverlappingUrisReportSuspense } from '../OverlappingUrisReport/OverlappingUrisReportSuspense';

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
                        href: '/',
                    },
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
