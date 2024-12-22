import React from 'react';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/solid';
import { GlobalType } from './GlobalType';

export function GlobalItem (
    {
        globalItem,
    }: {
        globalItem: GlobalType;
    },
) {
    return (
        <li className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {globalItem.name}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm leading-6 text-gray-900">
                        <Link
                            data-prevent-select
                            href={`/globals/edit/${globalItem.slug}`}
                            className="rounded bg-cyan-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ml-4"
                        >
                            <PencilIcon className="h-3 w-3 text-white inline -mt-0.5" />
                            {' '}
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
}
