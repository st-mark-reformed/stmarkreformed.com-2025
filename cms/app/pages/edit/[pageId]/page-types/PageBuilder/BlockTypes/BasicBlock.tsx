// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BasicBlockType } from '../PageBuilderTypes/BasicBlockType';
import TextInput from '../../../../../../inputs/TextInput';
import { BackgroundColorOptions } from '../PageBuilderTypes/BackgroundColorOptions';
import Alignment from '../../../../../../inputs/Alignment';
import RichTextEditor from '../../../../../../inputs/RichTextEditor';
import Urls from '../../../../../../inputs/Urls';
import ColorChooser from '../../../../../../inputs/ColorChooser';

export default function BasicBlock (
    {
        block,
        updateBlock,
    }: {
        block: BasicBlockType;
        updateBlock: (block: BasicBlockType) => void;
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
            <Alignment
                label="Alignment"
                name="alignment"
                value={block.alignment}
                setValue={setValue}
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
            <RichTextEditor
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
