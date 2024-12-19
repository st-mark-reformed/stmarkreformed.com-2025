// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PageType } from '../../../PageType';

export default function PageTypeFactory (
    {
        type,
        data,
        setData,
        json,
        setJson,
    }: {
        type: string;
        data: string;
        setData: (val: string) => void;
        json: Array<any>;
        setJson: (val: Array<any>) => void;
    },
) {
    // @ts-expect-error TS7053
    const pageType = PageType[type];

    if (pageType === PageType.page) {
        return <>TODO: Page</>;
        // return <Page data={data} setData={setData} />;
    }

    if (pageType === PageType.page_builder) {
        return <>TODO: Page Builder</>;
        // return <PageBuilder blocks={json} setBlocks={setJson} />;
    }

    if (pageType === PageType.calendar) {
        return null;
    }

    if (pageType === PageType.blog_entries) {
        return null;
    }

    if (pageType === PageType.podcast_entries) {
        return null;
    }

    if (pageType === PageType.menu_link) {
        return null;
    }

    if (pageType === PageType.menu_parent_only) {
        return null;
    }

    return null;
}
