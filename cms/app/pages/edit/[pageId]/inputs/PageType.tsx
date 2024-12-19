import React, { Fragment, useEffect, useState } from 'react';
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import GetPageTypes, { Option, Options } from './GetPageTypes';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

export default function PageType (
    {
        label,
        selectedType,
        setSelectedType,
    }: {
        label: string;
        selectedType: string;
        setSelectedType: (val: string) => void;
    },
) {
    const [options, setOptions] = useState<Options>([]);

    const selectedOption: Option = options?.filter(
        (option) => option.type === selectedType,
    )[0] || {
        type: '',
        name: '',
    };

    useEffect(() => {
        GetPageTypes().then((apiOptions) => {
            setOptions(apiOptions);
        });
    }, []);

    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <Listbox
                    value={selectedOption.type}
                    onChange={(val) => {
                        setSelectedType(val);
                    }}
                >
                    {({ open }) => (
                        <>
                            <Label className="sr-only">Change page type</Label>
                            <div className="relative">
                                <div className="inline-flex divide-x divide-cyan-700 rounded-md shadow-sm">
                                    <div
                                        className="inline-flex items-center gap-x-1.5 rounded-l-md bg-cyan-600 px-3 py-2 text-white shadow-sm"
                                    >
                                        <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        <p className="text-sm font-semibold">
                                            {selectedOption.name}
                                        </p>
                                    </div>
                                    <ListboxButton
                                        className="inline-flex items-center rounded-l-none rounded-r-md bg-cyan-600 p-2 hover:bg-cyan-700 focus:outline-none focus:ring-offset-gray-50"
                                    >
                                        <span className="sr-only">Change page type</span>
                                        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </ListboxButton>
                                </div>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <ListboxOptions
                                        className="absolute left-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        {options.map((option) => (
                                            <ListboxOption
                                                key={option.type}
                                                className={({ focus }) => classNames(
                                                    focus ? 'bg-cyan-600 text-white' : 'text-gray-900',
                                                    'cursor-pointer select-none p-4 text-sm',
                                                )}
                                                value={option.type}
                                            >
                                                {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                                                {({ selected, focus }) => (
                                                    <div className="flex flex-col">
                                                        <div className="flex justify-between">
                                                            <p className={selected ? 'font-semibold' : 'font-normal'}>{option.name}</p>
                                                            {selected ? (
                                                                <span className={focus ? 'text-white' : 'text-cyan-600'}>
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
            </div>
        </div>
    );
}
