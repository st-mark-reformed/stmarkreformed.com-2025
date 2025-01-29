'use client';

import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import PageHeader from '../../layout/PageHeader';
import { PageTypeWithDataNoChildrenFrontEnd } from '../../pages/PageType';
import { EntryTypeFrontEnd } from '../EntryType';
import Message from '../../messaging/Message';
import EmptyState from '../../EmptyState';
import RenderOnMount from '../../RenderOnMount';
import NewEntryOverlay from './NewEntryOverlay';
import ConfirmDeleteOverlay from '../../ConfirmDeleteOverlay';
import PageItem from './PageItem';

export default function PageClientSide (
    {
        blogPage,
        entries,
    }: {
        blogPage: PageTypeWithDataNoChildrenFrontEnd;
        entries: Array<EntryTypeFrontEnd>;
    },
) {
    const [overlay, setOverlay] = useState<
    ''
    | 'newEntry'
    | 'confirmDelete'
    >('');

    const [isDeleting, setIsDeleting] = useState(false);

    const closeOverlay = () => {
        setOverlay('');
    };

    const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

    const hasSelected = selectedIds.length > 0;

    return (
        <>
            <RenderOnMount>
                {(() => {
                    if (overlay === 'newEntry') {
                        return createPortal(
                            <NewEntryOverlay
                                blogPageId={blogPage.id}
                                closeOverlay={closeOverlay}
                            />,
                            document.body,
                        );
                    }

                    if (overlay === 'confirmDelete') {
                        return createPortal(
                            <ConfirmDeleteOverlay
                                closeOverlay={closeOverlay}
                                isDeleting={isDeleting}
                                heading="Delete Selected Entries?"
                                proceed={() => {
                                    setIsDeleting(true);

                                    // TODO: Delete selected pages
                                    console.log('TODO');
                                }}
                            />,
                            document.body,
                        );
                    }

                    return null;
                })()}
            </RenderOnMount>
            <div className="mb-4 ">
                <PageHeader
                    title={`${blogPage.name} Entries`}
                    primaryLink={(() => {
                        if (hasSelected) {
                            return {
                                content: (
                                    <>
                                        <TrashIcon className="h-5 w-5 mr-1" />
                                        Delete Selected
                                    </>
                                ),
                                onClick: () => {
                                    setOverlay('confirmDelete');
                                },
                            };
                        }

                        return {
                            content: (
                                <>
                                    <PlusIcon className="h-5 w-5 mr-1" />
                                    Add Entry
                                </>
                            ),
                            onClick: () => {
                                setOverlay('newEntry');
                            },
                        };
                    })()}
                    secondaryLink={(() => {
                        if (!hasSelected) {
                            return undefined;
                        }

                        return {
                            content: (
                                <>
                                    <MinusCircleIcon className="h-5 w-5 mr-1" />
                                    Deselect All
                                </>
                            ),
                            onClick: () => {
                                setSelectedIds([]);
                            },
                        };
                    })()}
                />
            </div>
            <Message
                isVisible={errorMessages.length > 0}
                setIsVisible={(state) => {
                    if (state !== false) {
                        return;
                    }

                    setErrorMessages([]);
                }}
                type="error"
                heading="There was an error"
                body={errorMessages}
                padBottom
            />
            {/* TODO: Pagination */}
            {(() => {
                if (entries.length < 1) {
                    return (
                        <EmptyState
                            onButtonClick={() => {
                                setOverlay('newEntry');
                            }}
                            itemNamePlural="Entries"
                            itemNameSingular="Entry"
                        />
                    );
                }

                return (
                    <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                        {entries.map((entry) => (
                            <PageItem
                                key={entry.slug}
                                entry={entry}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                            />
                        ))}
                    </ul>
                );
            })()}
            {/* TODO: Pagination */}
        </>
    );
}
