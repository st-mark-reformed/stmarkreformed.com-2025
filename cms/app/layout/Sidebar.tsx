'use client';

import React, { Fragment, useState } from 'react';
import {
    Dialog, DialogPanel, Transition, TransitionChild,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navigation from './Navigation';
import { PageTypeFrontEndNoDataArray } from '../pages/PageType';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar (
    {
        blogEntryPages,
        podcastEntryPages,
        photoGalleryEntryPages,
        publicationsEntryPages,
    }: {
        blogEntryPages: PageTypeFrontEndNoDataArray;
        podcastEntryPages: PageTypeFrontEndNoDataArray;
        photoGalleryEntryPages: PageTypeFrontEndNoDataArray;
        publicationsEntryPages: PageTypeFrontEndNoDataArray;
    },
) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = Navigation({
        blogEntryPages,
        podcastEntryPages,
        photoGalleryEntryPages,
        publicationsEntryPages,
    });

    return (
        <>
            {/* Mobile sidebar */}
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </TransitionChild>
                    <div className="fixed inset-0 flex">
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="/images/logo/logo-website-header.png"
                                            alt="SMRC CMS"
                                        />
                                        <span className="ml-3 font-bold">SMRC CMS</span>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <Fragment key={item.name}>
                                                            <li>
                                                                {(() => {
                                                                    if (item.href) {
                                                                        return (
                                                                            <Link
                                                                                href={item.href}
                                                                                className={classNames(
                                                                                    item.current
                                                                                        ? 'bg-gray-50 text-cyan-600'
                                                                                        : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50',
                                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                                                )}
                                                                            >
                                                                                <item.icon
                                                                                    className={classNames(
                                                                                        item.current ? 'text-cyan-600' : 'text-gray-400 group-hover:text-cyan-600',
                                                                                        'h-6 w-6 shrink-0',
                                                                                    )}
                                                                                    aria-hidden="true"
                                                                                />
                                                                                {item.name}
                                                                            </Link>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <span
                                                                            className={classNames(
                                                                                item.current
                                                                                    ? 'bg-gray-50 text-cyan-600'
                                                                                    : 'text-gray-700',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none',
                                                                            )}
                                                                        >
                                                                            <item.icon
                                                                                className={classNames(
                                                                                    item.current ? 'text-cyan-600' : 'text-gray-400',
                                                                                    'h-6 w-6 shrink-0',
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                            {item.name}
                                                                        </span>
                                                                    );
                                                                })()}
                                                            </li>
                                                            {(() => {
                                                                if (!item.children) {
                                                                    return null;
                                                                }

                                                                return item.children.map((child) => (
                                                                    <li key={child.href}>
                                                                        <Link
                                                                            href={child.href}
                                                                            className={classNames(
                                                                                child.current
                                                                                    ? 'bg-gray-50 text-cyan-600'
                                                                                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ml-8 pl-4',
                                                                            )}
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    </li>
                                                                ));
                                                            })()}
                                                        </Fragment>
                                                    ))}
                                                </ul>
                                            </li>
                                            {/* <li className="mt-auto">
                                                <Link
                                                    href="#todo"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                                                >
                                                    <Cog6ToothIcon
                                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600"
                                                        aria-hidden="true"
                                                    />
                                                    Settings
                                                </Link>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            className="h-8 w-auto"
                            src="/images/logo/logo-website-header.png"
                            alt="SMRC CMS"
                        />
                        <span className="ml-3 font-bold">SMRC CMS</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <Fragment key={item.name}>
                                            <li>
                                                {(() => {
                                                    if (item.href) {
                                                        return (
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-gray-50 text-cyan-600'
                                                                        : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={classNames(
                                                                        item.current ? 'text-cyan-600' : 'text-gray-400 group-hover:text-cyan-600',
                                                                        'h-6 w-6 shrink-0',
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        );
                                                    }

                                                    return (
                                                        <span
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-50 text-cyan-600'
                                                                    : 'text-gray-700',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none',
                                                            )}
                                                        >
                                                            <item.icon
                                                                className={classNames(
                                                                    item.current ? 'text-cyan-600' : 'text-gray-400',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </span>
                                                    );
                                                })()}
                                            </li>
                                            {(() => {
                                                if (!item.children) {
                                                    return null;
                                                }

                                                return item.children.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            className={classNames(
                                                                child.current
                                                                    ? 'bg-gray-50 text-cyan-600'
                                                                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ml-8 pl-4',
                                                            )}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ));
                                            })()}
                                        </Fragment>
                                    ))}
                                </ul>
                            </li>
                            {/* <li className="mt-auto">
                                <Link
                                    href="#todo"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                                >
                                    <Cog6ToothIcon
                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-cyan-600"
                                        aria-hidden="true"
                                    />
                                    Settings
                                </Link>
                            </li> */}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </>
    );
}
