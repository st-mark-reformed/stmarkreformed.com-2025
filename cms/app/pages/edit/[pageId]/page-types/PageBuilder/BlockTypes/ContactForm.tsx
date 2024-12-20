// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import RichTextEditor from '../../../../../../inputs/RichTextEditor';
import TextInput from '../../../../../../inputs/TextInput';
import { ContactFormType } from '../PageBuilderTypes/ContactFormType';

export default function ContactForm (
    {
        block,
        updateBlock,
    }: {
        block: ContactFormType;
        updateBlock: (block: ContactFormType) => void;
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
            <RichTextEditor
                label="Content"
                name="content"
                value={block.content}
                setValue={setValue}
            />
            <TextInput
                label="Success Redirect"
                name="successRedirect"
                value={block.successRedirect}
                setValue={setValue}
            />
        </div>
    );
}
