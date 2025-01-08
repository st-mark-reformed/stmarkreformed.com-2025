import React from 'react';
import TextInput from '../../../../inputs/TextInput';

export default function Calendar (
    {
        data,
        setData,
    }: {
        data: string;
        setData: (val: string) => void;
    },
) {
    return (
        <div>
            <TextInput
                label="Calendar ICS URL"
                name="calendar_ics_url"
                value={data}
                setValue={(key, val) => {
                    setData(val);
                }}
            />
        </div>
    );
}
