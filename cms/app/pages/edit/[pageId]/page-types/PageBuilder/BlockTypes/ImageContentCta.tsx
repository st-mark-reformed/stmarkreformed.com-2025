// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import ColorChooser from '../../../../../../inputs/ColorChooser';
import Toggle from '../../../../../../inputs/Toggle';
import RichTextEditor from '../../../../../../inputs/RichTextEditor';
import Url from '../../../../../../inputs/Url';
import { ImageContentCtaType } from '../PageBuilderTypes/ImageContentCtaType';
import { BackgroundColorOptionsNoWhite } from '../PageBuilderTypes/BackgroundColorOptions';
import RadioCards from '../../../../../../inputs/RadioCards';
import { DualContentDispositionOptions } from '../PageBuilderTypes/ContentDispositionOptions';
import SingleImageUploader from '../../../../../../inputs/SingleImageUploader';

export default function ImageContentCta (
    {
        block,
        updateBlock,
    }: {
        block: ImageContentCtaType;
        updateBlock: (block: ImageContentCtaType) => void;
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
                options={Object.keys(BackgroundColorOptionsNoWhite).map((key) => ({
                    // @ts-expect-error TS7053
                    color: BackgroundColorOptionsNoWhite[key],
                    name: key,
                }))}
            />
            <RadioCards
                label="Content Disposition"
                name="contentDisposition"
                value={block.contentDisposition}
                setValue={setValue}
                options={Object.values(DualContentDispositionOptions).map((option) => ({
                    name: option,
                    val: option,
                }))}
                gridColumnsBase={1}
                gridColumnsAtSm={3}
            />
            <SingleImageUploader
                label="Image"
                name="image"
                value={block.image}
                setValue={setValue}
            />
            <Toggle
                label="Show Teal Overlay on Images"
                name="showTealOverlayOnImages"
                value={block.showTealOverlayOnImages}
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
            <Url
                value={block.cta}
                setValue={(val) => {
                    setValue('cta', val);
                }}
            />
        </div>
    );
}
