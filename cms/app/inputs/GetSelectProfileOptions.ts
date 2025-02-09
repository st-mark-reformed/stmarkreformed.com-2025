'use server';

import GetProfilesData from '../profiles/GetProfilesData';

export type Option = {
    label: string;
    value: string;
};

export type Options = Array<Option>;

export default async function GetSelectProfileOptions (): Promise<Options> {
    const result = await GetProfilesData();

    if (!result.userHasAccess) {
        return [];
    }

    return result.data.map((profile) => ({
        label: profile.fullNameWithTitle,
        value: profile.id,
    }));
}
