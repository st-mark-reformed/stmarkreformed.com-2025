import React from 'react';
import CalendarSelectorSelect from './CalendarSelectorSelect';

export default function CalendarSelector (
    {
        label = 'Calendar Page',
        name = 'calendar_page',
        selectedValue,
        setSelectedValue,
    }: {
        label?: string;
        name?: string;
        selectedValue: string;
        setSelectedValue: (value: string) => void;
    },
) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2 grid grid-cols-1">
                <CalendarSelectorSelect
                    name={name}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />
            </div>
        </div>
    );
}
