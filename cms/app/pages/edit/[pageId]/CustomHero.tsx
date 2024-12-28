import React from 'react';
import Toggle from '../../../inputs/Toggle';
import { PageTypeWithDataNoChildren } from '../../PageType';
import RadioCards from '../../../inputs/RadioCards';
import { HeroDarkeningOverlayOptions } from '../../../globals/edit/[slug]/forms/HeroDarkeningOverlayOptions';
import SingleImageUploader from '../../../inputs/SingleImageUploader';

export function CustomHero (
    {
        data,
        setData,
    }: {
        data: PageTypeWithDataNoChildren;
        setData: (
            key: string,
            val: string | number | boolean | Array<never>,
        ) => void;
    },
) {
    return (
        <div className="space-y-8">
            <Toggle
                label="Use Custom Hero?"
                name="useCustomHero"
                value={data.useCustomHero ?? false}
                setValue={setData}
            />
            {(() => {
                if (!data.useCustomHero) {
                    return null;
                }

                return (
                    <div className="space-y-8">
                        <RadioCards
                            label="Hero Darkening Overlay Opacity"
                            name="heroDarkeningOverlayOpacity"
                            value={(data.heroDarkeningOverlayOpacity || 0).toString()}
                            setValue={(key, val) => {
                                setData(key, parseInt(val, 10));
                            }}
                            options={HeroDarkeningOverlayOptions}
                            gridColumnsBase={5}
                            gridColumnsAtSm={10}
                        />
                        <SingleImageUploader
                            label="Hero Image"
                            name="heroImage"
                            value={data.heroImage}
                            setValue={setData}
                        />
                    </div>
                );
            })()}
        </div>
    );
}
