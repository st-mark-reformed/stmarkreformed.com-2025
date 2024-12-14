'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    BarsArrowUpIcon,
    PlusIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';
import PageHeader from '../layout/PageHeader';
import EmptyState from '../EmptyState';
import RenderOnMount from '../RenderOnMount';
import NewPageOverlay from './NewPageOverlay';

export default function PageClientSide () {
    const [newPageIsOpen, setNewPageIsOpen] = useState(false);

    const renderCustomButton = () => (
        <>
            <Link
                href="/cms/pages/reorder"
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
            <EmptyState onButtonClick={() => {
                setNewPageIsOpen(true);
            }}
            />
        </>
    );
}
