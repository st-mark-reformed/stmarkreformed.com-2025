import React from 'react';
import { Metadata } from 'next';
import { createPageTitle } from '../createPageTitle';
import Layout, { InnerMaxWidth } from '../layout/Layout';
import { GetGlobalData } from './GetGlobalData';
import AccessDenied from '../AccessDenied';
import { GlobalItem } from './GlobalItem';
import PageHeader from '../layout/PageHeader';

export const metadata: Metadata = {
    title: createPageTitle('Globals'),
};

export default async function Page () {
    const result = await GetGlobalData();

    if (!result.userHasAccess) {
        return <AccessDenied />;
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [],
                currentBreadcrumb: { value: 'Globals' },
            }}
            innerMaxWidth={InnerMaxWidth.xsmall}
        >
            <div className="mb-4 ">
                <PageHeader title="Globals" />
            </div>
            <ul
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"
            >
                <GlobalItem globalItem={result.data.heroDefaults} />
                <GlobalItem globalItem={result.data.contactForm} />
            </ul>
        </Layout>
    );
}
