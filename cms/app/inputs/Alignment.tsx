import React from 'react';
import { Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { AlignmentOptions } from './AlignmentOptions';

export default function Alignment (
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
            <div>
                <ol className="mt-2 overflow-hidden border border-gray-300 rounded-md inline-block">
                    {Object.values(AlignmentOptions).map((option, i) => {
                        let borderClass = 'border-l border-gray-300';
                        let hoverClass = 'hover:bg-gray-200';
                        let activeClass = '';

                        if (i === 0) {
                            borderClass = '';
                        }

                        if (option === value) {
                            hoverClass = '';
                            activeClass = 'bg-orange-900 text-white';
                        }

                        return (
                            <li
                                key={option}
                                className="inline-block"
                            >
                                <button
                                    type="button"
                                    className={`cursor-pointer px-4 py-2 ${borderClass} ${hoverClass} ${activeClass}`}
                                    onClick={() => { setValue(name, option); }}
                                >
                                    <span className="sr-only">{option}</span>
                                    {(() => {
                                        if (option === AlignmentOptions.Left) {
                                            return <Bars3BottomLeftIcon className="h-8 w-8" />;
                                        }

                                        if (option === AlignmentOptions.Center) {
                                            return <Bars3Icon className="h-8 w-8" />;
                                        }

                                        if (option === AlignmentOptions.Right) {
                                            return <Bars3BottomRightIcon className="h-8 w-8" />;
                                        }

                                        return null;
                                    })()}
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}
