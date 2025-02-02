// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { EntryTypeType } from '../../../EntryTypeType';

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
        return <>{EntryTypeType.entry}</>;
    }

    if (entryType === EntryTypeType.entry_builder) {
        return <>{EntryTypeType.entry_builder}</>;
    }

    return (
        <>TODO</>
    );
}
