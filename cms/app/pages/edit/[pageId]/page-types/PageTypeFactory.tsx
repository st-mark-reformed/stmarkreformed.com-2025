// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PageType } from '../../../PageType';
import Page from './Page';
import PageBuilder from './PageBuilder/PageBuilder';
import TextInput from '../../../../inputs/TextInput';
import Calendar from './Calendar';

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
        return <Page data={data} setData={setData} />;
    }

    if (pageType === PageType.page_builder) {
        return <PageBuilder blocks={json} setBlocks={setJson} />;
    }

    if (pageType === PageType.calendar) {
        return <Calendar data={data} setData={setData} />;
    }

    if (pageType === PageType.blog_entries) {
        return null;
    }

    if (pageType === PageType.podcast_entries) {
        return null;
    }

    if (pageType === PageType.menu_link) {
        return (
            <TextInput
                label="Link"
                name="link"
                value={data}
                setValue={(key, val) => {
                    setData(val);
                }}
            />
        );
    }

    if (pageType === PageType.menu_parent_only) {
        return null;
    }

    return null;
}
