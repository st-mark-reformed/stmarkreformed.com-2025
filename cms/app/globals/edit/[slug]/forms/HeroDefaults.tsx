import React from 'react';
import { GlobalType } from '../../../GlobalType';
import RadioCards from '../../../../inputs/RadioCards';
import SingleImageUploader from '../../../../inputs/SingleImageUploader';
import { HeroDarkeningOverlayOptions } from './HeroDarkeningOverlayOptions';

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
                setValue={(key, val) => {
                    setValue(key, val);
                }}
                options={HeroDarkeningOverlayOptions}
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
