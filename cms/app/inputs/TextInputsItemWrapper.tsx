import React from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { TextInputsType } from './TextInputsType';

export default function TextInputsItemWrapper (
    {
        value,
        values,
        setValues,
        children,
    }: {
        value: TextInputsType;
        values: Array<TextInputsType>;
        setValues: (val: Array<TextInputsType>) => void;
        children: React.ReactNode;
    },
) {
    const removeValue = () => {
        const valueIndex = values.findIndex((v) => v.id === value.id);

        if (valueIndex < 0) {
            return;
        }

        const newValues = [...values];

        newValues.splice(valueIndex, 1);

        setValues(newValues);
    };

    return (
        <div className="w-full relative z-10">
            <div
                className="absolute right-0 -mt-4"
                style={{
                    top: '50%',
                }}
            >
                <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 focus:outline-none border border-gray-200"
                    onClick={removeValue}
                >
                    <span className="sr-only">Remove Value</span>
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="pl-4 pr-16 py-1">
                {children}
            </div>
        </div>
    );
}
