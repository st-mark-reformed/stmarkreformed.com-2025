import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/16/solid';
import { EntryTypeFrontEnd } from '../EntryType';
import { PageStatus } from '../../pages/PageType';
import RenderOnMount from '../../RenderOnMount';

export default function PageItem (
    {
        entry,
        selectedIds,
        setSelectedIds,
    }: {
        entry: EntryTypeFrontEnd;
        selectedIds: Array<string>;
        setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
    },
) {
    const isSelected = selectedIds.indexOf(entry.id) > -1;

    const statusBadgeClasses = [
        'bg-gray-50',
        'text-gray-600',
        'ring-gray-500/10',
    ];

    if (entry.status === PageStatus.published) {
        statusBadgeClasses.push(
            'bg-green-50',
            'text-green-700',
            'ring-green-600/20',
        );
    }

    const liClasses = [
        'relative',
        'flex',
        'justify-between',
        'gap-x-6',
        'px-4',
        'py-5',
        'sm:px-6',
    ];

    if (isSelected) {
        liClasses.push('bg-cyan-600/5');
    } else if (entry.status === PageStatus.unpublished) {
        liClasses.push('bg-gray-50');
    }

    const hasPage = entry.status === PageStatus.published;

    return (
        /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
        <li
            className={liClasses.join(' ')}
            onClick={(e) => {
                const element = e.target as HTMLElement;

                if (element.dataset.preventSelect) {
                    return;
                }

                const newSelectedPageIds = [...selectedIds];

                if (isSelected) {
                    newSelectedPageIds.splice(
                        selectedIds.indexOf(entry.id),
                        1,
                    );
                } else {
                    newSelectedPageIds.push(entry.id);
                }

                setSelectedIds(newSelectedPageIds);
            }}
        >
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {entry.name}
                        <span className={`ml-2 inline-flex items-center rounded-md px-1.5 py-0 text-xxs font-medium ring-1 ring-inset ${statusBadgeClasses.join(' ')}`}>
                            {entry.status}
                        </span>
                    </p>
                    <p className="text-sm font-light leading-6 text-gray-700 flex items-center mt-2">
                        <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {' '}
                        {(() => {
                            if (!entry.datePublished) {
                                return 'Date not set';
                            }

                            const dayName = entry.datePublished.toLocaleDateString(
                                'en-US',
                                { weekday: 'long' },
                            );

                            const monthName = entry.datePublished.toLocaleString(
                                'en-US',
                                { month: 'long' },
                            );

                            const day = entry.datePublished.getDate();

                            const timeString = entry.datePublished.toLocaleTimeString(
                                'en-US',
                                {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                },
                            );

                            return (
                                <RenderOnMount>
                                    {dayName}
                                    ,
                                    {' '}
                                    {monthName}
                                    ,
                                    {' '}
                                    {day}
                                    ,
                                    {' '}
                                    {timeString}
                                </RenderOnMount>
                            );
                        })()}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm leading-6 text-gray-900">
                        {(() => {
                            if (!hasPage) {
                                return null;
                            }

                            return (
                                <Link
                                    data-prevent-select
                                    href={entry.href}
                                    target="_blank"
                                    className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-4"
                                >
                                    <EyeIcon className="h-3 w-3 text-gray-900 inline -mt-0.5" />
                                    {' '}
                                    Go To Page &raquo;
                                </Link>
                            );
                        })()}
                        <Link
                            data-prevent-select
                            href={entry.cmsHref}
                            className="rounded bg-cyan-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ml-4"
                        >
                            <PencilIcon className="h-3 w-3 text-white inline -mt-0.5" />
                            {' '}
                            Edit
                        </Link>
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 ml-4"
                            checked={isSelected}
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </div>
        </li>
    );
}
