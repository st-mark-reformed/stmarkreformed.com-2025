import React from 'react';
import { TextInputsType } from './TextInputsType';
import TextInput from './TextInput';

export default function TextInputsValue (
    {
        value,
        setValue,
        individualLabels,
    }: {
        value: TextInputsType;
        setValue: (val: TextInputsType) => void;
        individualLabels: string;
    },
) {
    return (
        <div className="space-y-4">
            <TextInput
                label={individualLabels}
                name={`${value.id}-value`}
                value={value.value}
                setValue={(key, val) => {
                    const newValues = { ...value };
                    newValues.value = val;
                    setValue(newValues);
                }}
            />
        </div>
    );
}
