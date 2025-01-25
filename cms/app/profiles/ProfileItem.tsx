import React, { Dispatch, SetStateAction } from 'react';
import { PencilIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ProfileTypeFrontEnd } from './ProfileType';

export default function ProfileItem (
    {
        profile,
        apiFeUrl,
        selectedIds,
        setSelectedIds,
    }: {
        profile: ProfileTypeFrontEnd;
        apiFeUrl: string;
        selectedIds: Array<string>;
        setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
    },
) {
    const isSelected = selectedIds.indexOf(profile.id) > -1;

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
    }

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
                className={liClasses.join(' ')}
                onClick={(e) => {
                    const element = e.target as HTMLElement;

                    if (element.dataset.preventSelect) {
                        return;
                    }

                    const newSelectedIds = [...selectedIds];

                    if (isSelected) {
                        newSelectedIds.splice(
                            selectedIds.indexOf(profile.id),
                            1,
                        );
                    } else {
                        newSelectedIds.push(profile.id);
                    }

                    setSelectedIds(newSelectedIds);
                }}
            >
                <div className="flex min-w-0 gap-x-4 pl-0">
                    <div>
                        {(() => {
                            if (profile.photo) {
                                return (
                                    <img
                                        src={`${apiFeUrl}${profile.photo}`}
                                        alt={profile.fullNameWithTitle}
                                        className="w-12 mx-auto object-contain rounded"
                                    />
                                );
                            }

                            return (
                                <PhotoIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                />
                            );
                        })()}
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            {profile.fullNameWithTitle}
                            {(() => {
                                if (!profile.leadershipPosition.value) {
                                    return null;
                                }

                                return (
                                    <span
                                        className="ml-2 inline-flex items-center rounded-md px-1.5 py-0 text-xxs font-medium ring-1 ring-inset ring-cyan-600"
                                    >
                                        {profile.leadershipPosition.humanReadable}
                                    </span>
                                );
                            })()}
                        </p>
                        {(() => {
                            if (!profile.email) {
                                return null;
                            }

                            return (
                                <p className="text-xs font-extralight leading-6 text-gray-900">
                                    {profile.email}
                                </p>
                            );
                        })()}
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div className="text-sm leading-6 text-gray-900">
                            <Link
                                data-prevent-select
                                href={profile.cmsHref}
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
        </>
    );
}
