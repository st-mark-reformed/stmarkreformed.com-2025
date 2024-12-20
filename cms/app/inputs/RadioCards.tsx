import React from 'react';
import { Label, Radio, RadioGroup } from '@headlessui/react';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

export default function RadioCards (
    {
        label,
        name,
        value,
        setValue,
        options,
        gridColumnsBase = 2,
        gridColumnsAtSm = 4,
    }: {
        label: string;
        name: string;
        value: string;
        setValue: (key: string, val: string) => void;
        options: Array<{
            name: string;
            val: string;
        }>;
        gridColumnsBase?: number;
        gridColumnsAtSm?: number;
    },
) {
    let gridColumnsBaseClass = '';

    if (gridColumnsBase === 2) {
        gridColumnsBaseClass = 'grid-cols-2';
    } else if (gridColumnsBase === 3) {
        gridColumnsBaseClass = 'grid-cols-3';
    } else if (gridColumnsBase === 4) {
        gridColumnsBaseClass = 'grid-cols-4';
    }

    let gridColumnsAtSmClass = '';

    if (gridColumnsAtSm === 2) {
        gridColumnsAtSmClass = 'sm:grid-cols-2';
    } else if (gridColumnsAtSm === 3) {
        gridColumnsAtSmClass = 'sm:grid-cols-3';
    } else if (gridColumnsAtSm === 4) {
        gridColumnsAtSmClass = 'sm:grid-cols-4';
    } else if (gridColumnsAtSm === 5) {
        gridColumnsAtSmClass = 'sm:grid-cols-5';
    } else if (gridColumnsAtSm === 6) {
        gridColumnsAtSmClass = 'sm:grid-cols-6';
    }

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                {label}
            </label>
            <RadioGroup
                value={value}
                onChange={(val) => {
                    setValue(name, val);
                }}
                className="mt-2"
            >
                <Label className="sr-only">
                    {label}
                </Label>
                <div className={`grid ${gridColumnsBaseClass} gap-3 ${gridColumnsAtSmClass}`}>
                    {options.map((option) => (
                        <Radio
                            key={option.name}
                            value={option.val}
                            className={({ checked }) => classNames(
                                'cursor-pointer focus:outline-none',
                                checked
                                    ? 'bg-orange-700 text-white'
                                    : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold sm:flex-1',
                            )}
                        >
                            <Label as="span">{option.name}</Label>
                        </Radio>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
