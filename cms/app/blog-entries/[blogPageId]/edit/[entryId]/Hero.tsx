import React from 'react';
import TextInput from '../../../../inputs/TextInput';
import TextArea from '../../../../inputs/TextArea';
import { StringDataKeys, SubmissionData } from './useDataManager';

export default function Hero (
    {
        data,
        setStringData,
    }: {
        data: SubmissionData;
        setStringData: (key: StringDataKeys, val: string) => void;
    },
) {
    return (
        <>
            <div className="align-top grid gap-4 sm:grid-cols-2">
                <TextInput
                    label="Hero Heading"
                    name="heroHeading"
                    value={data.heroHeading}
                    setValue={(key: string, val: string) => {
                        setStringData('heroHeading', val);
                    }}
                />
                <TextInput
                    label="Hero Sub-heading"
                    name="heroSubheading"
                    value={data.heroSubheading}
                    setValue={(key: string, val: string) => {
                        setStringData('heroSubheading', val);
                    }}
                />
            </div>
            <TextArea
                label="Hero Paragraph"
                name="heroParagraph"
                value={data.heroParagraph}
                setValue={(key: string, val: string) => {
                    setStringData('heroParagraph', val);
                }}
            />
        </>
    );
}
