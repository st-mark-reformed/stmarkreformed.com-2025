import React from 'react';
import DndSingleFileUploader from './DndSingleFileUploader';

export default function SingleImageUploader (
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
                <DndSingleFileUploader
                    name={name}
                    fileUrl={value}
                    setImageData={(imageData) => {
                        setValue(name, imageData);
                    }}
                />
            </div>
        </div>
    );
}
