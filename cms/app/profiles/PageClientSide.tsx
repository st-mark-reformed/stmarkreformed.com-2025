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
import ConfirmDeleteOverlay from './ConfirmDeleteOverlay';

export default function PageClientSide (
    {
        profiles,
        apiFeUrl,
    }: {
        profiles: Array<ProfileTypeFrontEnd>;
        apiFeUrl: string;
    },
) {
    const [overlay, setOverlay] = useState<
    ''
    | 'newProfile'
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
                    if (overlay === 'newProfile') {
                        return createPortal(
                            <NewProfileOverlay closeOverlay={closeOverlay} />,
                            document.body,
                        );
                    }

                    if (overlay === 'confirmDelete') {
                        return createPortal(
                            <ConfirmDeleteOverlay
                                closeOverlay={closeOverlay}
                                isDeleting={isDeleting}
                                proceed={() => {
                                    setIsDeleting(true);

                                    DeleteProfiles(selectedIds).then((response) => {
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
                                    setOverlay('confirmDelete');
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
                                setOverlay('newProfile');
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
                                setOverlay('newProfile');
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
                                apiFeUrl={apiFeUrl}
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
