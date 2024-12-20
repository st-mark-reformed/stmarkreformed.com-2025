// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import { LeadershipType } from '../PageBuilderTypes/LeadershipType';

export default function Leadership (
    {
        block,
        updateBlock,
    }: {
        block: LeadershipType;
        updateBlock: (block: LeadershipType) => void;
    },
) {
    const setValue = (key: string, val: any) => {
        updateBlock({
            ...block,
            [key]: val,
        });
    };

    return (
        <div className="space-y-6">
            <TextInput
                label="Block Name (internal)"
                name="internalName"
                value={block.internalName}
                setValue={setValue}
            />
        </div>
    );
}
