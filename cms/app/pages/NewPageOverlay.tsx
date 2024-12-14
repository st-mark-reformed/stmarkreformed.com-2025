import React, { Dispatch, SetStateAction, useState } from 'react';
import PortalOverlay from '../layout/PortalOverlay';
import ErrorMessage from '../Messaging/ErrorMessage';

export default function NewPageOverlay (
    {
        setIsVisible,
    }: {
        setIsVisible: Dispatch<SetStateAction<boolean>>;
    },
) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pageName, setPageName] = useState('');

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    let headingTopPadding = '';

    if (errorIsVisible) {
        headingTopPadding = 'mt-2';
    }

    const submitHandler = () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        console.log('TODO: PostNewPageHandler');

        // PostNewPageHandler(pageName).then((result) => {
        //     setIsSubmitting(false);
        //
        //     if (result.data.success) {
        //         setErrors([]);
        //
        //         setIsVisible(false);
        //
        //         return;
        //     }
        //
        //     setErrors(result.data.messages);
        //
        //     setErrorIsVisible(true);
        // });
    };

    let buttonClasses = 'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ';

    if (isSubmitting) {
        buttonClasses += 'bg-gray-300';
    } else {
        buttonClasses += 'bg-cyan-600 hover:bg-cyan-700 focus-visible:outline-cyan-600';
    }

    return (
        <PortalOverlay>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className="bg-white shadow sm:rounded-lg text-left"
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setIsVisible(false);
                    }

                    if (e.key !== 'Enter') {
                        return;
                    }

                    submitHandler();
                }}
            >
                <div className="px-4 py-5 sm:p-6 min-w-96">
                    <ErrorMessage
                        isVisible={errorIsVisible}
                        setIsVisible={setErrorIsVisible}
                        heading="Something went wrong"
                        body={errors}
                    />
                    <h3 className={`${headingTopPadding} text-base font-semibold leading-6 text-gray-900`}>Page Name</h3>
                    <div className="mt-2 text-right">
                        <div className="w-full mb-2">
                            <label htmlFor="email" className="sr-only">
                                Page Name
                            </label>
                            <input
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                type="text"
                                name="pageName"
                                value={pageName}
                                onChange={(e) => {
                                    setPageName(e.currentTarget.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={() => {
                                    setIsVisible(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={buttonClasses}
                                onClick={submitHandler}
                                disabled={isSubmitting}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalOverlay>
    );
}
