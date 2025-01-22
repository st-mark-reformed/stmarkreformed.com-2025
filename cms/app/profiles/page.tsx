import React from 'react';
import { Metadata } from 'next';
import { createPageTitle } from '../createPageTitle';
import Layout, { InnerMaxWidth } from '../layout/Layout';
import PageClientSide from './PageClientSide';
import GetProfilesData from './GetProfilesData';
import AccessDenied from '../AccessDenied';

export const metadata: Metadata = {
    title: createPageTitle('Profiles'),
};

export default async function Page () {
    const result = await GetProfilesData();

    if (!result.userHasAccess) {
        return <AccessDenied />;
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [],
                currentBreadcrumb: { value: 'Profiles' },
            }}
            innerMaxWidth={InnerMaxWidth.small}
        >
            <PageClientSide profiles={result.data} />
        </Layout>
    );
}
