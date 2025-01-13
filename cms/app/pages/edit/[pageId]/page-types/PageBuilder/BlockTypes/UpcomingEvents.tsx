// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextInput from '../../../../../../inputs/TextInput';
import TextArea from '../../../../../../inputs/TextArea';
import { UpcomingEventsType } from '../PageBuilderTypes/UpcomingEventsType';
import CalendarSelector from '../../../../../../inputs/CalendarSelector';

export default function UpcomingEvents (
    {
        block,
        updateBlock,
    }: {
        block: UpcomingEventsType;
        updateBlock: (block: UpcomingEventsType) => void;
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
            <TextInput
                label="Heading"
                name="heading"
                value={block.heading}
                setValue={setValue}
            />
            <TextArea
                label="Sub Heading"
                name="subHeading"
                value={block.subHeading}
                setValue={setValue}
                rows={3}
            />
            <CalendarSelector
                selectedValue={block.calendarPage || ''}
                setSelectedValue={(value: string) => {
                    setValue('calendarPage', value);
                }}
            />
        </div>
    );
}
