import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { GetProfileData } from './GetProfileData';
import { createPageTitle } from '../../../createPageTitle';
import AccessDenied from '../../../AccessDenied';
import Layout from '../../../layout/Layout';
import PageClientSide from './PageClientSide';
import { ConfigOptions, getConfigString } from '../../../serverSideRunTimeConfig';

type Params = {
    params: { profileId: string };
};

export async function generateMetadata ({ params }: Params): Promise<Metadata> {
    const data = await GetProfileData(params.profileId);

    if (!data.userHasAccess) {
        return { title: createPageTitle('Access Denied') };
    }

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle([
            `Edit “${data.data.fullNameWithTitle}”`,
            'Profiles',
        ]),
    };
}

export default async function Page ({ params }: Params) {
    const data = await GetProfileData(params.profileId);

    if (!data.userHasAccess) {
        return <AccessDenied />;
    }

    if (data.notFound) {
        notFound();
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [{
                    value: 'Profiles',
                    href: '/profiles',
                }],
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
