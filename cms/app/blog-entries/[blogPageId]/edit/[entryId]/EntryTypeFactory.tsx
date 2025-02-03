// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { EntryTypeType } from '../../../EntryTypeType';
import Page from '../../../../pages/edit/[pageId]/page-types/Page';
import PageBuilder from '../../../../pages/edit/[pageId]/page-types/PageBuilder/PageBuilder';

export default function EntryTypeFactory (
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
    const entryType = EntryTypeType[type];

    if (entryType === EntryTypeType.entry) {
        return <Page data={data} setData={setData} />;
    }

    if (entryType === EntryTypeType.entry_builder) {
        return <PageBuilder blocks={json} setBlocks={setJson} />;
    }

    return null;
}
