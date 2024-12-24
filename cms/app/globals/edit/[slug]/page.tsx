import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { createPageTitle } from '../../../createPageTitle';
import { GetData } from './GetData';
import AccessDenied from '../../../AccessDenied';
import Layout from '../../../layout/Layout';
import PageClientSide from './PageClientSide';
import { ConfigOptions, getConfigString } from '../../../serverSideRunTimeConfig';

type Params = {
    params: { slug: 'heroDefaults' | 'contactForm' };
};

export async function generateMetadata ({ params }: Params): Promise<Metadata> {
    const data = await GetData(params.slug);

    if (!data.userHasAccess) {
        return { title: createPageTitle('Access Denied') };
    }

    if (data.notFound) {
        return { title: createPageTitle('Page Not Found') };
    }

    return {
        title: createPageTitle([
            `Edit “${data.data.name}”`,
            'Globals',
        ]),
    };
}

export default async function Page ({ params }: Params) {
    const data = await GetData(params.slug);

    if (!data.userHasAccess) {
        return <AccessDenied />;
    }

    if (data.notFound) {
        notFound();
    }

    return (
        <Layout
            breadcrumbs={{
                breadcrumbs: [
                    {
                        value: 'Globals',
                        href: '/globals',
                    },
                ],
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
