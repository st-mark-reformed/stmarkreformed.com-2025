'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { GlobalType } from '../../GlobalType';
import useDataManager from './useDataManager';
import { FrontEndPageContext } from '../../../FrontEndPageContext';
import PageHeader from '../../../layout/PageHeader';
import ContactForm from './forms/ContactForm';
import HeroDefaults from './forms/HeroDefaults';
import Message from '../../../messaging/Message';

export default function PageClientSide (
    {
        initialData,
        apiFeUrl,
    }: {
        initialData: GlobalType;
        apiFeUrl: string;
    },
) {
    const { data, setData } = useDataManager(initialData);

    const [success, setSuccess] = useState(false);

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    const renderSubmitButton = () => (
        <button
            type="button"
            className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={() => {
                setSuccess(false);

                // PatchGlobal(data).then((result) => {
                //     if (result.data.success) {
                //         setSuccess(true);
                //
                //         setErrorIsVisible(false);
                //
                //         setErrors([]);
                //
                //         return;
                //     }
                //
                //     setSuccess(false);
                //
                //     setErrors(result.data.messages);
                //
                //     setErrorIsVisible(true);
                // });
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
                        subTitle={data.slug}
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
                    {(() => {
                        if (data.slug === 'heroDefaults') {
                            return <HeroDefaults data={data} setData={setData} />;
                        }

                        if (data.slug === 'contactForm') {
                            return <ContactForm data={data} setData={setData} />;
                        }

                        return null;
                    })()}
                </div>
            </form>
        </FrontEndPageContext.Provider>
    );
}
