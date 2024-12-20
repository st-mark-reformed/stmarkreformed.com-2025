import React from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

export type ColorChooserOption = {
    color: string;
    name: string;
};

export type ColorChooserOptions = Array<ColorChooserOption>;

export default function ColorChooser (
    {
        label,
        name,
        value,
        setValue,
        options,
    }: {
        label: string;
        name: string;
        value: string;
        setValue: (key: string, val: string) => void;
        options: ColorChooserOptions;
    },
) {
    return (
        <div>
            <RadioGroup
                value={value}
                onChange={(val) => {
                    setValue(name, val);
                }}
            >
                <RadioGroup.Label className="block text-sm font-semibold leading-6 text-gray-900">
                    {label}
                </RadioGroup.Label>
                <div className="mt-4 flex items-center space-x-3">
                    {options.map((color) => (
                        <RadioGroup.Option
                            key={color.name}
                            value={color.color}
                            className={({ checked }) => classNames(
                                'ring-orange-400',
                                checked ? 'ring ring-offset-1' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                            )}
                        >
                            <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                            </RadioGroup.Label>
                            <span
                                aria-hidden="true"
                                className="h-8 w-8 rounded-full border border-black border-opacity-10"
                                style={{
                                    backgroundColor: color.color,
                                }}
                            />
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
