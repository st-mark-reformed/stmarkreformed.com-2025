import { useState } from 'react';
import { ProfileTypeFrontEnd } from '../../ProfileType';

export const LeadershipPositions = {
    '': 'None',
    pastor: 'Pastor',
    associate_pastor: 'Associate Pastor',
    assistant_pastor: 'Assistant Pastor',
    elder: 'Elder',
    ruling_elder: 'Ruling Elder',
    deacon: 'Deacon',
};

export default function useDataManager (initialData: ProfileTypeFrontEnd) {
    const [data, setDataInternal] = useState<ProfileTypeFrontEnd>(initialData);

    function setData (
        key: string,
        val: string | boolean | Array<string> | Record<string, string>,
    ) {
        const newData = { ...data };

        // @ts-expect-error TS7053
        newData[key] = val;

        newData.firstAndLastName = `${newData.firstName} ${newData.lastName}`;

        newData.fullNameWithTitle = `${newData.titleOrHonorific} ${newData.firstAndLastName}`;

        setDataInternal(newData);
    }

    function setLeadershipPosition (val: keyof typeof LeadershipPositions) {
        setData('leadershipPosition', {
            value: val,
            humanReadable: LeadershipPositions[val],
        });
    }

    return {
        data,
        setData,
        setLeadershipPosition,
    };
}
