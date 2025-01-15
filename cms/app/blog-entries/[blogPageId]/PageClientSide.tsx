'use client';

import React from 'react';
import PageHeader from '../../layout/PageHeader';
import { PageTypeWithDataNoChildrenFrontEnd } from '../../pages/PageType';

export default function PageClientSide (
    {
        blogPage,
    }: {
        blogPage: PageTypeWithDataNoChildrenFrontEnd;
    },
) {
    return (
        <>
            <div className="mb-4 ">
                <PageHeader
                    title={`${blogPage.name} Entries`}
                />
            </div>
        </>
    );
}
