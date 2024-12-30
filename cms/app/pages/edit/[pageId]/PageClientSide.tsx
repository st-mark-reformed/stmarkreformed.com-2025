'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { v4 as uuid } from 'uuid';
import {
    PageType as PageTypeType,
    PageStatus,
    PageTypeWithDataNoChildrenFrontEnd,
} from '../../PageType';
import useDataManager from './useDataManager';
import { FrontEndPageContext } from '../../../FrontEndPageContext';
import PageHeader from '../../../layout/PageHeader';
import Message from '../../../messaging/Message';
import PageType from './inputs/PageType';
import TextInput from '../../../inputs/TextInput';
import Toggle from '../../../inputs/Toggle';
import PageTypeFactory from './page-types/PageTypeFactory';
import PatchPage from './PatchPage';
import { CustomHero } from './CustomHero';
import Url from '../../../inputs/Url';
import { UrlFieldTypeValues } from '../../../inputs/UrlFieldType';
import TextArea from '../../../inputs/TextArea';

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

    if (!data.heroUpperCta.id) {
        data.heroUpperCta = {
            id: uuid(),
            type: UrlFieldTypeValues.Custom,
            linkText: '',
            linkData: '',
            newWindow: false,
        };
    }

    let showPageControls = true;

    if (data.type === PageTypeType.menu_link || data.type === PageTypeType.menu_parent_only) {
        showPageControls = false;
    }

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
                    <div className="align-top grid gap-4 sm:grid-cols-2">
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
                    </div>
                    <div className="align-top grid gap-4 sm:grid-cols-4">
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
                        {(() => {
                            if (!showPageControls) {
                                return null;
                            }

                            return (
                                <>
                                    <Toggle
                                        label="Show In Menu?"
                                        name="showInMenu"
                                        value={data.showInMenu}
                                        setValue={setData}
                                    />
                                    <Toggle
                                        label="Show Sub-Page Sidebar?"
                                        name="showSubPageSidebar"
                                        value={data.showSubPageSidebar}
                                        setValue={setData}
                                    />
                                    <Toggle
                                        label="Use Short Hero?"
                                        name="useShortHero"
                                        value={data.useShortHero}
                                        setValue={setData}
                                    />
                                </>
                            );
                        })()}
                    </div>
                    {(() => {
                        if (!showPageControls) {
                            return null;
                        }

                        return (
                            <>
                                <CustomHero data={data} setData={setData} />
                                <div>
                                    <div className="block text-sm font-semibold leading-6 text-gray-900 pb-2">
                                        Hero Upper CTA
                                    </div>
                                    <div className="p-4 border">
                                        <Url
                                            value={data.heroUpperCta}
                                            setValue={(val) => {
                                                // @ts-expect-error TS2345
                                                setData('heroUpperCta', val);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="align-top grid gap-4 sm:grid-cols-2">
                                    <TextInput
                                        label="Hero Heading"
                                        name="heroHeading"
                                        value={data.heroHeading}
                                        setValue={setData}
                                    />
                                    <TextInput
                                        label="Hero Sub-heading"
                                        name="heroSubheading"
                                        value={data.heroSubheading}
                                        setValue={setData}
                                    />
                                </div>
                                <TextArea
                                    label="Hero Paragraph"
                                    name="heroParagraph"
                                    value={data.heroParagraph}
                                    setValue={setData}
                                />
                            </>
                        );
                    })()}
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
