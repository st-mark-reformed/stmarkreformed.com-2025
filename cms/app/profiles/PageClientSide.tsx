'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon } from '@heroicons/react/16/solid';
import PageHeader from '../layout/PageHeader';
import { ProfileTypeFrontEnd } from './ProfileType';
import RenderOnMount from '../RenderOnMount';
import NewProfileOverlay from './NewProfileOverlay';
import EmptyState from '../EmptyState';

export default function PageClientSide (
    {
        profiles,
    }: {
        profiles: Array<ProfileTypeFrontEnd>;
    },
) {
    const [newProfileIsOpen, setNewProfileIsOpen] = useState(false);

    return (
        <>
            <RenderOnMount>
                {(() => {
                    if (!newProfileIsOpen) {
                        return null;
                    }

                    return createPortal(
                        <NewProfileOverlay
                            setIsVisible={setNewProfileIsOpen}
                        />,
                        document.body,
                    );
                })()}
            </RenderOnMount>
            <div className="mb-4 ">
                <PageHeader
                    title="Profiles"
                    primaryLink={{
                        content: (
                            <>
                                <PlusIcon className="h-5 w-5 mr-1" />
                                {' '}
                                Add Profile
                            </>
                        ),
                        onClick: () => {
                            setNewProfileIsOpen(true);
                        },
                    }}
                />
            </div>
            {(() => {
                if (profiles.length < 1) {
                    return (
                        <EmptyState
                            onButtonClick={() => {
                                setNewProfileIsOpen(true);
                            }}
                            itemNamePlural="Profiles"
                            itemNameSingular="Profile"
                        />
                    );
                }

                return <>TODO</>;
            })()}
        </>
    );
}
