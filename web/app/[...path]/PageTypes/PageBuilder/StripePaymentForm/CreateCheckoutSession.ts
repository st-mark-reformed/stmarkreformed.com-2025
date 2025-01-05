'use server';

import { Stripe } from 'stripe';
import { ConfigOptions, getConfigString } from '../../../../serverSideRunTimeConfig';

const stripe = new Stripe(getConfigString(ConfigOptions.STRIPE_SECRET_KEY), {
    apiVersion: '2024-12-18.acacia',
});

type ReturnWithFailure = {
    success: false;
    error: string;
};

type ReturnWithSuccess = {
    success: true;
    sessionId: string;
};

export default async function CreateCheckoutSession (
    amount: string,
    successUrl: string,
    cancelUrl: string,
): Promise<ReturnWithFailure | ReturnWithSuccess> {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: parseFloat(amount) * 100, // Amount is in cents
                        product_data: {
                            name: 'Donation',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            submit_type: 'donate',
        });

        return {
            success: true,
            sessionId: session.id,
        };
    } catch (error) {
        // console.error(error);

        return {
            success: false,
            error: 'An unknown error occurred.',
        };
    }
}
