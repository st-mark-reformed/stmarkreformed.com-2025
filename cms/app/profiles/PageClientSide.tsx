'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon } from '@heroicons/react/16/solid';
import PageHeader from '../layout/PageHeader';
import { ProfileTypeFrontEnd } from './ProfileType';
import RenderOnMount from '../RenderOnMount';
import NewProfileOverlay from './NewProfileOverlay';
import EmptyState from '../EmptyState';
import ProfileItem from './ProfileItem';

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

                return (
                    <ul
                        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"
                    >
                        {profiles.map((profile) => (
                            <ProfileItem
                                key={`${profile.id}-parent`}
                                profile={profile}
                            />
                        ))}
                    </ul>
                );
            })()}
        </>
    );
}
