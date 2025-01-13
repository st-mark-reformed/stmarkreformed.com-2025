import React, { useEffect, useState } from 'react';
import GetCalendarSelector, { Options } from './GetCalendarSelector';

export default function CalendarSelectorSelect (
    {
        name,
        selectedValue,
        setSelectedValue,
    }: {
        name: string;
        selectedValue: string;
        setSelectedValue: (value: string) => void;
    },
) {
    const [loading, setLoading] = useState(true);

    const [options, setOptions] = useState<Options>([]);

    useEffect(() => {
        GetCalendarSelector().then((loadedOptions) => {
            setOptions(loadedOptions);

            setLoading(false);
        });
    }, []);

    return (
        <select
            id={name}
            name={name}
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
        >
            {(() => {
                if (loading) {
                    return <option disabled>Loading…</option>;
                }

                return options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ));
            })()}
        </select>
    );
}
