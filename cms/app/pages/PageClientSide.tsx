'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    BarsArrowUpIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import PageHeader from '../layout/PageHeader';
import EmptyState from '../EmptyState';
import RenderOnMount from '../RenderOnMount';
import NewPageOverlay from './NewPageOverlay';
import Message from '../messaging/Message';
import { PageTypeFrontEndNoDataArray } from './PageType';
import PageItem from './PageItem';

export default function PageClientSide (
    {
        pages,
    }: {
        pages: PageTypeFrontEndNoDataArray;
    },
) {
    const [newPageIsOpen, setNewPageIsOpen] = useState(false);

    const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

    const hasSelected = selectedIds.length > 0;

    const renderCustomButton = () => {
        if (hasSelected) {
            return (
                <>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm bg-white/10 text-white hover:bg-white/20"
                        onClick={() => {
                            setSelectedIds([]);
                        }}
                    >
                        <MinusCircleIcon className="h-5 w-5 mr-1" />
                        Deselect All
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        onClick={() => {
                            console.log('TODO: DeletePages');

                            // DeletePages(selectedIds).then(() => {
                            //     setSelectedIds([]);
                            // });
                        }}
                    >
                        <TrashIcon className="h-5 w-5 mr-1" />
                        Delete Selected
                    </button>
                </>
            );
        }

        return (
            <>
                <Link
                    href="/pages/reorder"
                    className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                    <BarsArrowUpIcon className="h-5 w-5 mr-1" />
                    {' '}
                    Reorder Pages
                </Link>
                <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    onClick={() => {
                        setNewPageIsOpen(true);
                    }}
                >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    {' '}
                    Add Page
                </button>
            </>
        );
    };

    return (
        <>
            <RenderOnMount>
                {(() => {
                    if (!newPageIsOpen) {
                        return null;
                    }

                    return (
                        createPortal(
                            <NewPageOverlay setIsVisible={setNewPageIsOpen} />,
                            document.body,
                        )
                    );
                })()}
            </RenderOnMount>
            <div className="mb-4 ">
                <PageHeader
                    title="Site Pages"
                    RenderCustomButton={renderCustomButton}
                />
            </div>
            <Message
                type="error"
                heading="There is an overlap in URIs"
                body={['TODO: Query and display error message if there are any overlapping URIs']}
                padBottom
            />
            {(() => {
                if (pages.length < 1) {
                    return (
                        <EmptyState onButtonClick={() => {
                            setNewPageIsOpen(true);
                        }}
                        />
                    );
                }

                return (
                    <ul
                        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"
                    >
                        {pages.map((page) => (
                            <PageItem
                                key={`${page.slug}-parent`}
                                page={page}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                            />
                        ))}
                    </ul>
                );
            })()}
        </>
    );
}
