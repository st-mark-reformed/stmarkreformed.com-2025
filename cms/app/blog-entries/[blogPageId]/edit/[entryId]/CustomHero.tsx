import React from 'react';
import {
    BooleanDataKeys,
    NumberDataKeys,
    StringDataKeys,
    SubmissionData,
} from './useDataManager';
import Toggle from '../../../../inputs/Toggle';
import RadioCards from '../../../../inputs/RadioCards';
import { HeroDarkeningOverlayOptions } from '../../../../globals/edit/[slug]/forms/HeroDarkeningOverlayOptions';
import SingleImageUploader from '../../../../inputs/SingleImageUploader';

export default function CustomHero (
    {
        data,
        setStringData,
        setNumberData,
        setBooleanData,
    }: {
        data: SubmissionData;
        setStringData: (key: StringDataKeys, val: string) => void;
        setBooleanData: (key: BooleanDataKeys, val: boolean) => void;
        setNumberData: (key: NumberDataKeys, val: number) => void;
    },
) {
    return (
        <>
            <div className="align-top grid gap-4 sm:grid-cols-2">
                <Toggle
                    label="Use Short Hero?"
                    name="useShortHero"
                    value={data.useShortHero}
                    setValue={(key: string, val: boolean) => {
                        setBooleanData('useShortHero', val);
                    }}
                />
                <Toggle
                    label="Use Custom Hero?"
                    name="useCustomHero"
                    value={data.useCustomHero ?? false}
                    setValue={(key: string, val: boolean) => {
                        setBooleanData('useCustomHero', val);
                    }}
                />
            </div>
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
                                setNumberData(
                                    'heroDarkeningOverlayOpacity',
                                    parseInt(val, 10),
                                );
                            }}
                            options={HeroDarkeningOverlayOptions}
                            gridColumnsBase={5}
                            gridColumnsAtSm={10}
                        />
                        <SingleImageUploader
                            label="Hero Image"
                            name="heroImage"
                            value={data.heroImage}
                            setValue={(key: string, val: string) => {
                                setStringData('heroImage', val);
                            }}
                        />
                    </div>
                );
            })()}
        </>
    );
}
