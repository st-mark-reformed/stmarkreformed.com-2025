'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { PageStatus, PageTypeWithDataNoChildrenFrontEnd } from '../../PageType';
import useDataManager from './useDataManager';
import { FrontEndPageContext } from '../../../FrontEndPageContext';
import PageHeader from '../../../layout/PageHeader';
import Message from '../../../messaging/Message';
import PageType from './inputs/PageType';
import TextInput from '../../../inputs/TextInput';
import Toggle from '../../../inputs/Toggle';
import PageTypeFactory from './page-types/PageTypeFactory';
import PatchPage from './PatchPage';

export default function PageClientSide (
    {
        initialData,
        apiFeUrl,
    }: {
        initialData: PageTypeWithDataNoChildrenFrontEnd;
        apiFeUrl: string;
    },
) {
    const { data, setData, setSlug } = useDataManager(initialData);

    const [success, setSuccess] = useState(false);

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    const renderSubmitButton = () => (
        <button
            type="button"
            className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={() => {
                setSuccess(false);

                PatchPage(data).then((result) => {
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
            }}
        >
            <CheckIcon className="h-5 w-5 mr-1" />
            {' '}
            Submit Updates
        </button>
    );

    const contextValue = useMemo(() => ({
        apiFeUrl,
    }), [apiFeUrl]);

    return (
        <FrontEndPageContext.Provider value={contextValue}>
            <form>
                <div className="pb-4">
                    <PageHeader
                        title={data.name}
                        subTitle={`/${data.path}`}
                        RenderCustomButton={renderSubmitButton}
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
                    <PageType
                        label="Page Type"
                        selectedType={data.type}
                        setSelectedType={(val) => {
                            setData('type', val);
                        }}
                    />
                    <TextInput
                        label="Page Name"
                        name="name"
                        value={data.name}
                        setValue={setData}
                    />
                    <TextInput
                        label="Slug"
                        name="slug"
                        value={data.slug}
                        setValue={(key: string, val: string) => {
                            setSlug(val);
                        }}
                    />
                    <Toggle
                        label="Publish Status"
                        name="status"
                        value={data.status === PageStatus.published}
                        setValue={(key: string, val: boolean) => {
                            setData(
                                'status',
                                val ? PageStatus.published : PageStatus.unpublished,
                            );
                        }}
                    />
                    <Toggle
                        label="Show In Menu?"
                        name="showInMenu"
                        value={data.showInMenu}
                        setValue={setData}
                    />
                    <PageTypeFactory
                        type={data.type}
                        data={data.data}
                        setData={(val) => {
                            setData('data', val);
                        }}
                        json={data.json}
                        setJson={(val) => {
                            // @ts-expect-error TS2345
                            setData('json', val);
                        }}
                    />
                </div>
            </form>
        </FrontEndPageContext.Provider>
    );
}
