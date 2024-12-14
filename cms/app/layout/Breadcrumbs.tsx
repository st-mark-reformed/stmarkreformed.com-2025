import React from 'react';
import { HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export type CurrentBreadcrumbItem = {
    value: string;
};

export type BreadcrumbItem = CurrentBreadcrumbItem & {
    href: string;
};

export type BreadcrumbItems = Array<BreadcrumbItem>;

export default function Breadcrumbs (
    {
        breadcrumbs = [],
        currentBreadcrumb,
    }: {
        breadcrumbs?: BreadcrumbItems;
        currentBreadcrumb: CurrentBreadcrumbItem;
    },
) {
    return (
        <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
            <ol className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
                <li className="flex">
                    <div className="flex items-center">
                        <Link href="/" className="text-gray-400 hover:text-gray-500">
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.href} className="flex">
                        <div className="flex items-center">
                            <svg
                                className="h-full w-6 flex-shrink-0 text-gray-200"
                                viewBox="0 0 24 44"
                                preserveAspectRatio="none"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            <Link
                                href={breadcrumb.href}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {breadcrumb.value}
                            </Link>
                        </div>
                    </li>
                ))}
                <li className="flex">
                    <div className="flex items-center">
                        <svg
                            className="h-full w-6 flex-shrink-0 text-gray-200"
                            viewBox="0 0 24 44"
                            preserveAspectRatio="none"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                        </svg>
                        <span className="ml-4 text-sm font-medium text-gray-500">
                            {currentBreadcrumb.value}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
}
