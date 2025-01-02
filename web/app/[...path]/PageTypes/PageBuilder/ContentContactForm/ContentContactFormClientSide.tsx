'use client';

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */

import React, {
    useState, ChangeEvent, FormEvent, useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { ContentContactFormType, FormValues } from './ContentContactFormType';
import PostContactForm from './PostContactForm';
import Alert from '../../../../Alert';

export default function ContentContactFormClientSide (
    {
        block,
    }: {
        block: ContentContactFormType;
    },
) {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [formValues, setFormValues] = useState<FormValues>({});

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (formValues.fromUrl) {
            return;
        }

        setFormValues({ ...formValues, fromUrl: window.location.href });
    }, [formValues]);

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        setErrors([]);

        PostContactForm(formValues).then((result) => {
            if (result.success) {
                router.push(block.successRedirect);

                return;
            }

            setIsSubmitting(false);

            setErrors(result.messages);
        });
    };

    // Handle input changes
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="relative bg-gray-100 border border-gray-200 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="relative overflow-hidden py-10 px-6 bg-crimson sm:px-10 xl:p-12">
                        <div
                            className="prose text-gray-100 prose-over-dark"
                            dangerouslySetInnerHTML={{
                                __html: block.content,
                            }}
                        />
                    </div>
                    <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                        {(() => {
                            if (errors.length < 1) {
                                return null;
                            }

                            let possiblePlural = 'error';

                            if (errors.length > 1) {
                                possiblePlural += 's';
                            }

                            return (
                                <div className="pb-6">
                                    <Alert
                                        type="error"
                                        headline={`We ran into the following ${possiblePlural} trying to send your email:`}
                                        contentList={errors}
                                    />
                                </div>
                            );
                        })()}
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                        >
                            <input
                                type="text"
                                name="aPassword"
                                className="sr-only"
                                tabIndex={-1}
                                autoComplete="nope"
                                value={formValues.aPassword || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="yourCompany"
                                className="sr-only"
                                tabIndex={-1}
                                autoComplete="nope"
                                value={formValues.yourCompany || ''}
                                onChange={handleInputChange}
                            />
                            <input type="hidden" name="fromUrl" value="TODO" />
                            <div>
                                <label htmlFor="your_name" className="block text-sm font-medium text-gray-900">Your name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-crimson focus:border-crimson border-gray-300 rounded-md"
                                        value={formValues.name || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="your_email" className="block text-sm font-medium text-gray-900">Your Email Address</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="emailAddress"
                                        id="emailAddress"
                                        className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-crimson focus:border-crimson border-gray-300 rounded-md"
                                        value={formValues.emailAddress || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                                <div className="mt-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-crimson focus:border-crimson border border-gray-300 rounded-md"
                                        value={formValues.message || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:flex sm:justify-end">
                                <button
                                    type="submit"
                                    className={(() => {
                                        const classes = [
                                            'mt-2',
                                            'w-full',
                                            'inline-flex',
                                            'items-center',
                                            'justify-center',
                                            'px-6',
                                            'py-3',
                                            'border',
                                            'border-transparent',
                                            'rounded-md',
                                            'shadow-sm',
                                            'text-base',
                                            'font-medium',
                                            'text-white',
                                            'focus:outline-none',
                                            'focus:ring-2',
                                            'focus:ring-offset-2',
                                            'sm:w-auto',
                                        ];

                                        if (isSubmitting) {
                                            classes.push(...[
                                                'bg-gray-400',
                                            ]);
                                        } else {
                                            classes.push(...[
                                                'bg-crimson',
                                                'hover:bg-crimson-dark',
                                                'focus:ring-crimson-dark',
                                            ]);
                                        }

                                        return classes.join(' ');
                                    })()}
                                    disabled={isSubmitting}
                                >
                                    <div>
                                        {(() => {
                                            if (!isSubmitting) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    className="loader border-t-gray-500 ease-linear rounded-full border-4 border-t-4 border-gray-200 h-4 w-4 inline-block align-middle mr-1"
                                                />
                                            );
                                        })()}
                                        <span className="inline-block align-middle">
                                            Submit
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
