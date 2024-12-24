import React from 'react';
import { GlobalType } from '../../../GlobalType';
import TextInputs from '../../../../inputs/TextInputs';
import { TextInputsType } from '../../../../inputs/TextInputsType';

type ContactFormType = {
    recipients: Array<TextInputsType>;
};

type ContactFormTypeTentative = {
    recipients?: Array<TextInputsType>;
};

export default function ContactForm (
    {
        data,
        setData,
    }: {
        data: GlobalType;
        setData: (
            key: string,
            val: string | number | boolean | Array<never>,
        ) => void;
    },
) {
    const incoming = data.json as ContactFormTypeTentative;

    const contactFormData: ContactFormType = {
        recipients: incoming.recipients || [],
    };

    return (
        <>
            <TextInputs
                label="Recipients"
                name="recipients"
                individualLabels="Email Address"
                values={contactFormData.recipients}
                setValues={(key: string, val: Array<TextInputsType>) => {
                    // @ts-expect-error TS2322
                    contactFormData[key] = val;

                    // @ts-expect-error TS2345
                    setData('json', contactFormData);
                }}
            />
        </>
    );
}
