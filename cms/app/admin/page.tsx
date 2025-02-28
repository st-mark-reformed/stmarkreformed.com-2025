import React from 'react';
import { Metadata } from 'next';
import { createPageTitle } from '../createPageTitle';
import Layout, { InnerMaxWidth } from '../layout/Layout';
import PageHeader from '../layout/PageHeader';
import ListItem from './ListItem';
import RegenerateSiteData from './RegenerateSiteData/RegenerateSiteData';
import Message from '../messaging/Message';
import PageClientSide from './PageClientSide';

export const metadata: Metadata = {
    title: createPageTitle('Admin'),
};

export default async function Page () {
    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [],
                currentBreadcrumb: { value: 'Admin' },
            }}
            innerMaxWidth={InnerMaxWidth.xsmall}
        >
            <div className="mb-4 ">
                <PageHeader title="Admin" />
            </div>
            <PageClientSide />
        </Layout>
    );
}
