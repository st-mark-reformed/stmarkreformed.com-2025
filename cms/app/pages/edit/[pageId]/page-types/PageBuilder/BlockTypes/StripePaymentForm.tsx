// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import Toggle from '../../../../../../inputs/Toggle';
import { StripePaymentFormType } from '../PageBuilderTypes/StripePaymentFormType';

export default function StripePaymentForm (
    {
        block,
        updateBlock,
    }: {
        block: StripePaymentFormType;
        updateBlock: (block: StripePaymentFormType) => void;
    },
) {
    const setValue = (key: string, val: any) => {
        updateBlock({
            ...block,
            [key]: val,
        });
    };

    return (
        <div className="space-y-6">
            <TextInput
                label="Block Name (internal)"
                name="internalName"
                value={block.internalName}
                setValue={setValue}
            />
            <Toggle
                label="No top space"
                name="noTopSpace"
                value={block.noTopSpace}
                setValue={setValue}
            />
            <TextInput
                label="Heading"
                name="heading"
                value={block.heading}
                setValue={setValue}
            />
            <TextInput
                label="Default Amount"
                name="defaultAmount"
                value={block.defaultAmount}
                setValue={setValue}
            />
            <TextInput
                label="Success Redirect"
                name="successRedirect"
                value={block.successRedirect}
                setValue={setValue}
            />
        </div>
    );
}
