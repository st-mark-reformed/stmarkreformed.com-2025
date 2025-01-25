import React from 'react';
import { Metadata } from 'next';
import { createPageTitle } from '../createPageTitle';
import Layout, { InnerMaxWidth } from '../layout/Layout';
import PageClientSide from './PageClientSide';
import GetProfilesData from './GetProfilesData';
import AccessDenied from '../AccessDenied';
import { ConfigOptions, getConfigString } from '../serverSideRunTimeConfig';

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
            <PageClientSide
                apiFeUrl={getConfigString(ConfigOptions.API_FE_URL)}
                profiles={result.data}
            />
        </Layout>
    );
}
