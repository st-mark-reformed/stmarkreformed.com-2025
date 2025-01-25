'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import PageHeader from '../layout/PageHeader';
import { ProfileTypeFrontEnd } from './ProfileType';
import RenderOnMount from '../RenderOnMount';
import NewProfileOverlay from './NewProfileOverlay';
import EmptyState from '../EmptyState';
import ProfileItem from './ProfileItem';
import DeleteProfiles from './DeleteProfiles';
import Message from '../messaging/Message';

export default function PageClientSide (
    {
        profiles,
    }: {
        profiles: Array<ProfileTypeFrontEnd>;
    },
) {
    const [newProfileIsOpen, setNewProfileIsOpen] = useState(false);

    const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

    const hasSelected = selectedIds.length > 0;

    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

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
                                    DeleteProfiles(selectedIds).then((response) => {
                                        if (response.data.success) {
                                            setSelectedIds([]);

                                            return;
                                        }

                                        setErrorMessages(response.data.messages);
                                    });
                                },
                            };
                        }

                        return {
                            content: (
                                <>
                                    <PlusIcon className="h-5 w-5 mr-1" />
                                    Add Profile
                                </>
                            ),
                            onClick: () => {
                                setNewProfileIsOpen(true);
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
