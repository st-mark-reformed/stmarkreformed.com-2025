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
import { PageTypeFrontEndNoDataArray } from './PageType';
import PageItem from './PageItem';
import DeletePages from './DeletePages';
import Message from '../messaging/Message';
import ConfirmDeleteOverlay from '../ConfirmDeleteOverlay';

export default function PageClientSide (
    {
        pages,
        children,
    }: {
        pages: PageTypeFrontEndNoDataArray;
        children: React.ReactNode;
    },
) {
    const [overlay, setOverlay] = useState<
    ''
    | 'newPage'
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
                    if (overlay === 'newPage') {
                        return createPortal(
                            <NewPageOverlay closeOverlay={closeOverlay} />,
                            document.body,
                        );
                    }

                    if (overlay === 'confirmDelete') {
                        return createPortal(
                            <ConfirmDeleteOverlay
                                closeOverlay={closeOverlay}
                                isDeleting={isDeleting}
                                heading="Delete Selected Pages?"
                                proceed={() => {
                                    setIsDeleting(true);

                                    DeletePages(selectedIds).then((response) => {
                                        if (response.data.success) {
                                            setSelectedIds([]);

                                            closeOverlay();

                                            setIsDeleting(false);

                                            return;
                                        }

                                        setErrorMessages(response.data.messages);
                                    });
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
                    title="Site Pages"
                    // RenderCustomButton={renderCustomButton}
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
                                    Add Page
                                </>
                            ),
                            onClick: () => {
                                setOverlay('newPage');
                            },
                        };
                    })()}
                    secondaryLink={(() => {
                        if (hasSelected) {
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
                        }

                        return {
                            content: (
                                <>
                                    <BarsArrowUpIcon className="h-5 w-5 mr-1" />
                                    Reorder Pages
                                </>
                            ),
                            href: '/pages/reorder',
                        };
                    })()}
                />
            </div>
            {children}
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
            {(() => {
                if (pages.length < 1) {
                    return (
                        <EmptyState
                            onButtonClick={() => {
                                setOverlay('newPage');
                            }}
                            itemNamePlural="Pages"
                            itemNameSingular="Page"
                        />
                    );
                }

                return (
                    <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
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
