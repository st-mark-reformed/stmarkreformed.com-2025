'use client';

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { v4 as uuid } from 'uuid';
import { EntryTypeFrontEnd } from '../../../EntryType';
import useDataManager from './useDataManager';
import { FrontEndPageContext } from '../../../../FrontEndPageContext';
import PageHeader from '../../../../layout/PageHeader';
import Message from '../../../../messaging/Message';
import EntryType from './inputs/EntryType';
import TextInput from '../../../../inputs/TextInput';
import { PageStatus } from '../../../../pages/PageType';
import Toggle from '../../../../inputs/Toggle';
import CustomHero from './CustomHero';
import Hero from './Hero';
import EntryTypeFactory from './EntryTypeFactory';
import PatchEntry from './PatchEntry';
import { EntryTypeType } from '../../../EntryTypeType';
import CustomDateTimePicker from '../../../../inputs/CustomDateTimePicker';
import Url from '../../../../inputs/Url';
import { UrlFieldTypeValues } from '../../../../inputs/UrlFieldType';

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
        setBooleanData,
        setNumberData,
        setSlug,
        setStatus,
        setType,
        setJson,
        setDatePublished,
        setHeroUpperCta,
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

                                let datePublished = null;

                                if (data.datePublished) {
                                    const Y = data.datePublished.getFullYear()
                                        .toString();
                                    const m = (data.datePublished.getMonth() + 1)
                                        .toString()
                                        .padStart(2, '0');
                                    const d = data.datePublished.getDate()
                                        .toString()
                                        .padStart(2, '0');
                                    const H = data.datePublished.getHours()
                                        .toString()
                                        .padStart(2, '0');
                                    const i = data.datePublished.getMinutes()
                                        .toString()
                                        .padStart(2, '0');

                                    datePublished = `${Y}-${m}-${d} ${H}:${i}:00`;
                                }

                                PatchEntry({ ...data, datePublished }).then((result) => {
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
                        body={['The page has been updated']}
                    />
                    <Message
                        type="error"
                        isVisible={errorIsVisible}
                        setIsVisible={setErrorIsVisible}
                        heading="Something went wrong"
                        body={errors}
                    />
                    <div className="align-top grid gap-4 sm:grid-cols-4">
                        <EntryType
                            label="Entry Type"
                            selectedType={data.type}
                            setSelectedType={(val: string) => {
                                const type = val as EntryTypeType;
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
                        <div className="sm:col-span-2">
                            <CustomDateTimePicker
                                label="Publish Date"
                                name="publishDate"
                                value={data.datePublished}
                                setValue={setDatePublished}
                            />
                        </div>
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
                    <CustomHero
                        data={data}
                        setStringData={setStringData}
                        setBooleanData={setBooleanData}
                        setNumberData={setNumberData}
                    />
                    <div>
                        <div className="block text-sm font-semibold leading-6 text-gray-900 pb-2">
                            Hero Upper CTA
                        </div>
                        <div className="p-4 border">
                            {(() => {
                                if (!data.heroUpperCta.id) {
                                    setHeroUpperCta({
                                        id: uuid(),
                                        type: UrlFieldTypeValues.Custom,
                                        linkText: '',
                                        linkData: '',
                                        newWindow: false,
                                    });

                                    return null;
                                }

                                return (
                                    <Url
                                        value={data.heroUpperCta}
                                        setValue={setHeroUpperCta}
                                    />
                                );
                            })()}
                        </div>
                    </div>
                    <Hero
                        data={data}
                        setStringData={setStringData}
                    />
                    <EntryTypeFactory
                        type={data.type}
                        data={data.data}
                        setData={(val: string) => {
                            setStringData('data', val);
                        }}
                        json={data.json}
                        setJson={(val: Array<any>) => {
                            // @ts-expect-error TS2345
                            setJson(val);
                        }}
                    />
                </div>
            </form>
        </FrontEndPageContext.Provider>
    );
}
