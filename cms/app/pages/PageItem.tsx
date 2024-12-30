import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { EyeIcon, PencilIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { PageStatus, PageType, PageTypeFrontEndNoData } from './PageType';

export default function PageItem (
    {
        page,
        level = 1,
        selectedIds,
        setSelectedIds,
    }: {
        page: PageTypeFrontEndNoData;
        level?: number;
        selectedIds: Array<string>;
        setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
    },
) {
    const isSelected = selectedIds.indexOf(page.id) > -1;

    let paddingClass = 'pl-0';

    if (level === 2) {
        paddingClass = 'pl-8';
    } else if (level === 3) {
        paddingClass = 'pl-16';
    } else if (level === 4) {
        paddingClass = 'pl-24';
    } else if (level === 5) {
        paddingClass = 'pl-32';
    } else if (level > 5) {
        return null;
    }

    let statusBadgeClasses = 'bg-gray-50 text-gray-600 ring-gray-500/10';

    if (page.status === PageStatus.published) {
        statusBadgeClasses = 'bg-green-50 text-green-700 ring-green-600/20';
    }

    let menuBadgeClasses = 'bg-gray-50 text-gray-600 ring-gray-500/10';

    if (page.showInMenu) {
        menuBadgeClasses = 'bg-green-50 text-green-700 ring-green-600/20';
    }

    let liClasses = 'relative flex justify-between gap-x-6 px-4 py-5 sm:px-6';

    if (isSelected) {
        liClasses += ' bg-cyan-600/5';
    }

    let hasPage = true;

    if (
        page.status !== PageStatus.published
        || page.type === PageType.menu_link
        || page.type === PageType.menu_parent_only
    ) {
        hasPage = false;
    }

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
                className={liClasses}
                onClick={(e) => {
                    const element = e.target as HTMLElement;

                    if (element.dataset.preventSelect) {
                        return;
                    }

                    const newSelectedPageIds = [...selectedIds];

                    if (isSelected) {
                        newSelectedPageIds.splice(
                            selectedIds.indexOf(page.id),
                            1,
                        );
                    } else {
                        newSelectedPageIds.push(page.id);
                    }

                    setSelectedIds(newSelectedPageIds);
                }}
            >
                <div className={`flex min-w-0 gap-x-4 ${paddingClass}`}>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            {page.name}
                            <span
                                className={`ml-2 inline-flex items-center rounded-md px-1.5 py-0 text-xxs font-medium ring-1 ring-inset ${statusBadgeClasses}`}
                            >
                                {page.status}
                            </span>
                            <span
                                className={`ml-2 inline-flex items-center rounded-md px-1.5 py-0 text-xxs font-medium ring-1 ring-inset ${menuBadgeClasses}`}
                            >
                                {page.showInMenu ? 'Menu On' : 'Menu Off'}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                    <div className="sm:flex sm:flex-col sm:items-end">
                        <div className="text-sm leading-6 text-gray-900">
                            {(() => {
                                if (page.type === PageType.blog_entries) {
                                    return (
                                        <Link
                                            data-prevent-select
                                            href={`/blog-entries/${page.id}`}
                                            className="rounded bg-orange-800 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ml-4"
                                        >
                                            <ListBulletIcon className="h-3 w-3 text-white inline -mt-0.5" />
                                            {' '}
                                            Entries List
                                        </Link>
                                    );
                                }

                                return null;
                            })()}
                            {(() => {
                                if (!hasPage) {
                                    return null;
                                }

                                return (
                                    <Link
                                        data-prevent-select
                                        href={page.href}
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
                                href={page.cmsHref}
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
            {page.children.map(
                (childPage: PageTypeFrontEndNoData) => (
                    <PageItem
                        key={childPage.slug}
                        level={level + 1}
                        page={childPage}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                ),
            )}
        </>
    );
}
