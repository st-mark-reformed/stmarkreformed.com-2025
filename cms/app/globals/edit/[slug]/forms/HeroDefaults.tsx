import React from 'react';
import { GlobalType } from '../../../GlobalType';
import RadioCards from '../../../../inputs/RadioCards';
import SingleImageUploader from '../../../../inputs/SingleImageUploader';

type HeroDefaultsType = {
    heroDarkeningOverlayOpacity: number;
    heroImage: string;
};

type HeroDefaultsTypeTentative = {
    heroDarkeningOverlayOpacity?: number;
    heroImage?: string;
};

export default function HeroDefaults (
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
    const incoming = data.json as HeroDefaultsTypeTentative;

    const heroDefaultsData: HeroDefaultsType = {
        heroDarkeningOverlayOpacity: incoming.heroDarkeningOverlayOpacity || 0,
        heroImage: incoming.heroImage || '',
    };

    const setValue = (
        key: string,
        val: string | number,
    ) => {
        // @ts-expect-error TS2322
        heroDefaultsData[key] = val;

        // @ts-expect-error TS2345
        setData('json', heroDefaultsData);
    };

    return (
        <>
            <RadioCards
                label="Hero Darkening Overlay Opacity"
                name="heroDarkeningOverlayOpacity"
                value={(heroDefaultsData.heroDarkeningOverlayOpacity || 0).toString()}
                setValue={setValue}
                options={[
                    {
                        name: '0',
                        val: '0',
                    },
                    {
                        name: '10',
                        val: '10',
                    },
                    {
                        name: '20',
                        val: '20',
                    },
                    {
                        name: '30',
                        val: '30',
                    },
                    {
                        name: '40',
                        val: '40',
                    },
                    {
                        name: '50',
                        val: '50',
                    },
                    {
                        name: '60',
                        val: '60',
                    },
                    {
                        name: '70',
                        val: '70',
                    },
                    {
                        name: '80',
                        val: '80',
                    },
                    {
                        name: '90',
                        val: '90',
                    },
                ]}
                gridColumnsBase={5}
                gridColumnsAtSm={10}
            />
            <SingleImageUploader
                label="Hero Image"
                name="heroImage"
                value={heroDefaultsData.heroImage}
                setValue={setValue}
            />
        </>
    );
}
