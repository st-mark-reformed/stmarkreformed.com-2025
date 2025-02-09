import React, { useEffect, useState } from 'react';
import Select from 'react-select/base';
import GetSelectProfileOptions, { Options } from './GetSelectProfileOptions';

export default function SelectProfile (
    {
        label,
        name,
        value,
        setValue,
    }: {
        label: string;
        name: string;
        value: string;
        setValue: (val: string) => void;
    },
) {
    const [isOpen, setIsOpen] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [options, setOptions] = useState<Options>([]);

    useEffect(() => {
        GetSelectProfileOptions().then((responseOptions) => {
            setOptions(responseOptions);

            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <Select
                    classNames={{
                        container: () => ('react-select-control'),
                    }}
                    onMenuOpen={() => {
                        setIsOpen(true);
                    }}
                    onMenuClose={() => {
                        setIsOpen(false);
                        setSearchValue('');
                    }}
                    menuIsOpen={isOpen}
                    onInputChange={(val) => {
                        setSearchValue(val);
                    }}
                    // @ts-expect-error TS2322
                    onChange={(val: Option) => {
                        setValue(val?.value || '');
                    }}
                    options={options}
                    isLoading={isLoading}
                    // @ts-expect-error TS2322
                    defaultValue={options.filter((option) => option.value === value)[0]}
                    inputValue={searchValue}
                    value={options.filter((option) => option.value === value)[0]}
                    isClearable
                />
            </div>
        </div>
    );
}
