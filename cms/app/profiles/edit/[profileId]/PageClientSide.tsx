'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ProfileTypeFrontEnd } from '../../ProfileType';
import useDataManager, { LeadershipPositions } from './useDataManager';
import { FrontEndPageContext } from '../../../FrontEndPageContext';
import PageHeader from '../../../layout/PageHeader';
import Message from '../../../messaging/Message';
import SingleImageUploader from '../../../inputs/SingleImageUploader';
import TextInput from '../../../inputs/TextInput';
import RadioPanel from '../../../inputs/RadioPanel';
import RichTextEditor from '../../../inputs/RichTextEditor';
import PatchProfile from './PatchProfile';

export default function PageClientSide (
    {
        initialData,
        apiFeUrl,
    }: {
        initialData: ProfileTypeFrontEnd;
        apiFeUrl: string;
    },
) {
    const {
        data,
        setData,
        setLeadershipPosition,
    } = useDataManager(initialData);

    const [success, setSuccess] = useState(false);

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    const contextValue = useMemo(() => ({
        apiFeUrl,
    }), [apiFeUrl]);

    return (
        <FrontEndPageContext.Provider value={contextValue}>
            <form>
                <div className="pb-4">
                    <PageHeader
                        title={data.fullNameWithTitle}
                        subTitle={`${data.leadershipPosition.value ? data.leadershipPosition.humanReadable : ''}`}
                        primaryLink={{
                            content: (
                                <>
                                    <CheckIcon className="h-5 w-5 mr-1" />
                                    {' '}
                                    Submit Updates
                                </>
                            ),
                            onClick: () => {
                                setSuccess(false);

                                PatchProfile(data).then((result) => {
                                    if (result.data.success) {
                                        setSuccess(true);

                                        setErrorIsVisible(false);

                                        setErrors([]);

                                        return;
                                    }

                                    setSuccess(false);

                                    setErrors(result.data.messages);

                                    setErrorIsVisible(true);
                                });
                            },
                        }}
                    />
                </div>
                <div className="space-y-8">
                    <Message
                        type="success"
                        isVisible={success}
                        setIsVisible={setSuccess}
                        heading="Success!"
                        body={['The profile has been updated']}
                    />
                    <Message
                        type="error"
                        isVisible={errorIsVisible}
                        setIsVisible={setErrorIsVisible}
                        heading="Something went wrong"
                        body={errors}
                    />
                    <SingleImageUploader
                        label="Photo"
                        name="photo"
                        value={data.photo}
                        setValue={setData}
                    />
                    <div className="align-top grid gap-4 sm:grid-cols-3">
                        <TextInput
                            label="Title or Honorific"
                            name="titleOrHonorific"
                            value={data.titleOrHonorific}
                            setValue={setData}
                        />
                        <TextInput
                            label="First Name"
                            name="firstName"
                            value={data.firstName}
                            setValue={setData}
                        />
                        <TextInput
                            label="Last Name"
                            name="lastName"
                            value={data.lastName}
                            setValue={setData}
                        />
                    </div>
                    <TextInput
                        label="Email"
                        name="email"
                        value={data.email}
                        setValue={setData}
                    />
                    <RadioPanel
                        label="Leadership Position"
                        name="leadershipPosition"
                        value={data.leadershipPosition.value}
                        setValue={(name, val) => {
                            const value = val as keyof typeof LeadershipPositions;

                            setLeadershipPosition(value);
                        }}
                        options={Object.keys(LeadershipPositions).map(
                            (position) => ({
                                // @ts-expect-error TS7053
                                name: LeadershipPositions[position],
                                val: position,
                            }),
                        )}
                    />
                    <RichTextEditor
                        label="Bio"
                        name="bio"
                        value={data.bio}
                        setValue={setData}
                    />
                </div>
            </form>
        </FrontEndPageContext.Provider>
    );
}
