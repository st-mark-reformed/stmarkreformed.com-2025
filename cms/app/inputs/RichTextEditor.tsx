import React from 'react';
import WysiwygEditor from '../WysiwygEditor';

export default function RichTextEditor (
    {
        label,
        name,
        value,
        setValue,
    }: {
        label: string;
        name: string;
        value: string;
        setValue: (key: string, val: string) => void;
    },
) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <WysiwygEditor
                    data={value}
                    setData={(val) => {
                        setValue(name, val);
                    }}
                />
            </div>
        </div>
    );
}
