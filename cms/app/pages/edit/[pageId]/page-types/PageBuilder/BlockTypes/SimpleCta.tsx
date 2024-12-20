// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import ColorChooser from '../../../../../../inputs/ColorChooser';
import Urls from '../../../../../../inputs/Urls';
import { SimpleCtaType } from '../PageBuilderTypes/SimpleCtaType';
import { BackgroundColorOptions } from '../PageBuilderTypes/BackgroundColorOptions';
import TextArea from '../../../../../../inputs/TextArea';

export default function SimpleCta (
    {
        block,
        updateBlock,
    }: {
        block: SimpleCtaType;
        updateBlock: (block: SimpleCtaType) => void;
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
            <ColorChooser
                label="Background Color"
                name="backgroundColor"
                value={block.backgroundColor}
                setValue={setValue}
                options={Object.keys(BackgroundColorOptions).map((key) => ({
                    // @ts-expect-error TS7053
                    color: BackgroundColorOptions[key],
                    name: key,
                }))}
            />
            <TextInput
                label="Pre-Headline"
                name="preHeadline"
                value={block.preHeadline}
                setValue={setValue}
            />
            <TextInput
                label="Headline"
                name="headline"
                value={block.headline}
                setValue={setValue}
            />
            <TextArea
                label="Content"
                name="content"
                value={block.content}
                setValue={setValue}
            />
            <Urls
                label="CTAs"
                name="ctas"
                value={block.ctas}
                setValue={setValue}
            />
        </div>
    );
}
