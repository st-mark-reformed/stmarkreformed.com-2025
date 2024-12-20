import React from 'react';

export default function TextArea (
    {
        label,
        name,
        value,
        setValue,
        rows = 5,
    }: {
        label: string;
        name: string;
        value: string;
        setValue: (key: string, val: string) => void;
        rows?: number;
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
                <textarea
                    name={name}
                    rows={rows}
                    id={name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                    value={value}
                    onChange={(e) => {
                        setValue(name, e.currentTarget.value);
                    }}
                />
            </div>
        </div>
    );
}
