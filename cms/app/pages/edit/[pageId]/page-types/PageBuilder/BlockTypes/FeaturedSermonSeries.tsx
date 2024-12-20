// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import { FeaturedSermonSeriesType } from '../PageBuilderTypes/FeaturedSermonSeriesType';

export default function FeaturedSermonSeries (
    {
        block,
        updateBlock,
    }: {
        block: FeaturedSermonSeriesType;
        updateBlock: (block: FeaturedSermonSeriesType) => void;
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
