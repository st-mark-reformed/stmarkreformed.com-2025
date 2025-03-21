'use client';

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import smartypants from 'smartypants';
import { loadStripe } from '@stripe/stripe-js';
import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { StripePaymentFormBlockType } from './StripePaymentFormBlockType';
import CreateCheckoutSession from './CreateCheckoutSession';

export default function StripePaymentForm (
    {
        blockBase,
        stripePublishableKey,
    }: {
        blockBase: PageBuilderBlockBase;
        stripePublishableKey: string;
    },
) {
    const block = blockBase as StripePaymentFormBlockType;

    const [amount, setAmount] = useState(block.defaultAmount);

    const stripePromise = loadStripe(stripePublishableKey);

    const handleStripeCheckoutSession = async () => {
        const stripe = await stripePromise;

        if (!stripe) {
            throw new Error('An unknown error occurred.');
        }

        const result = await CreateCheckoutSession(
            amount,
            window.location.origin + block.successRedirect,
            window.location.href,
        );

        if (!result.success) {
            return;
        }

        await stripe.redirectToCheckout({
            sessionId: result.sessionId,
        });
    };

    return (
        <div
            className={(() => {
                const classes = [
                    'relative',
                    'mx-auto',
                    'px-4',
                    'py-12',
                    'sm:max-w-5xl',
                    'sm:px-14',
                    'sm:py-20',
                    'md:py-28',
                    'lg:py-32',
                ];

                if (block.noTopSpace) {
                    classes.push(
                        'pt-0',
                        'sm:pt-0',
                        'md:pt-0',
                        'lg:pt-0',
                    );
                }

                return classes.join(' ');
            })()}
        >
            <div className="w-full flex items-center justify-center">
                <div className="max-w-xl">
                    <div>
                        <form
                            className="rounded bg-gray-50 shadow-md pt-6 px-8 pb-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleStripeCheckoutSession();
                            }}
                        >
                            <div className="mb-1">
                                <div className="mb-2">
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-bold text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: smartypants(block.heading),
                                        }}
                                    />
                                </div>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="block w-full pl-7 sm:text-sm border-gray-300 rounded-md focus:ring-0 focus:border-crimson"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        step="1"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-crimson hover:bg-crimson-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson"
                            >
                                <span>Proceed to payment</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
