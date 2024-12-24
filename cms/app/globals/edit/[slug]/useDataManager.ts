import { useState } from 'react';
import { GlobalType } from '../../GlobalType';

export default function useDataManager (initialData: GlobalType) {
    const [data, setDataInternal] = useState<GlobalType>(initialData);

    const setData = (
        key: string,
        val: string | number | boolean | Array<never>,
    ) => {
        const newData = { ...data };

        // @ts-expect-error TS7053
        newData[key] = val;

        setDataInternal(newData);
    };

    return {
        data,
        setData,
    };
}
