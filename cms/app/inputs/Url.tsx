import React from 'react';
import TextInput from './TextInput';
import Toggle from './Toggle';
import { UrlFieldType } from './UrlFieldType';

export default function Url (
    {
        value,
        setValue,
        linkTextLabel = 'Link Text',
    }: {
        value: UrlFieldType;
        setValue: (val: UrlFieldType) => void;
        linkTextLabel?: string;
    },
) {
    return (
        <div className="space-y-4">
            <TextInput
                label={linkTextLabel}
                name={`${value.id}-link-text`}
                value={value.linkText}
                setValue={(key, val) => {
                    const newValues = { ...value };
                    newValues.linkText = val;
                    setValue(newValues);
                }}
            />
            <TextInput
                label="Link URL"
                name={`${value.id}-link-url`}
                value={value.linkData}
                setValue={(key, val) => {
                    const newValues = { ...value };
                    newValues.linkData = val;
                    setValue(newValues);
                }}
            />
            <Toggle
                label="Open in New Window?"
                name={`${value.id}-link-new-window`}
                value={value.newWindow}
                setValue={(key, val) => {
                    const newValues = { ...value };
                    newValues.newWindow = val;
                    setValue(newValues);
                }}
            />
        </div>
    );
}
