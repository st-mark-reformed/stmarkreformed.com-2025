'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { EntryTypeFrontEnd, Type } from '../../../EntryType';
import useDataManager from './useDataManager';
import { FrontEndPageContext } from '../../../../FrontEndPageContext';
import PageHeader from '../../../../layout/PageHeader';
import Message from '../../../../messaging/Message';
import EntryType from './inputs/EntryType';
import TextInput from '../../../../inputs/TextInput';
import { PageStatus } from '../../../../pages/PageType';
import Toggle from '../../../../inputs/Toggle';

export default function PageClientSide (
    {
        initialData,
        apiFeUrl,
    }: {
        initialData: EntryTypeFrontEnd;
        apiFeUrl: string;
    },
) {
    const {
        data,
        setStringData,
        setSlug,
        setStatus,
        setType,
        setJson,
        setDatePublished,
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
                        title={data.name}
                        subTitle={data.path}
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

                                console.log('todo');
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
                        body={['The page has been updated']}
                    />
                    <Message
                        type="error"
                        isVisible={errorIsVisible}
                        setIsVisible={setErrorIsVisible}
                        heading="Something went wrong"
                        body={errors}
                    />
                    <div className="align-top grid gap-4 sm:grid-cols-2">
                        <EntryType
                            label="Entry Type"
                            selectedType={data.type}
                            setSelectedType={(val: string) => {
                                const type = val as Type;
                                setType(type);
                            }}
                        />
                        <Toggle
                            label="Publish Status"
                            name="status"
                            value={data.status === PageStatus.published}
                            setValue={(key: string, val: boolean) => {
                                setStatus(
                                    val ? PageStatus.published : PageStatus.unpublished,
                                );
                            }}
                        />
                    </div>
                    <div className="align-top grid gap-4 sm:grid-cols-2">
                        <TextInput
                            label="Page Name"
                            name="name"
                            value={data.name}
                            setValue={(key, val) => {
                                setStringData('name', val);
                            }}
                        />
                        <TextInput
                            label="Slug"
                            name="slug"
                            value={data.slug}
                            setValue={(key: string, val: string) => {
                                setSlug(val);
                            }}
                        />
                    </div>
                </div>
            </form>
        </FrontEndPageContext.Provider>
    );
}
