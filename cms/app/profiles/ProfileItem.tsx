import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ProfileTypeFrontEnd } from './ProfileType';

export default function ProfileItem (
    {
        profile,
    }: {
        profile: ProfileTypeFrontEnd;
    },
) {
    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
                <div className="flex min-w-0 gap-x-4 pl-0">
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
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}
