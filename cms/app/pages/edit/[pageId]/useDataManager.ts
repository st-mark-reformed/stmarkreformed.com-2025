import { useState } from 'react';
import { PageTypeWithDataNoChildren } from '../../PageType';

export default function useDataManager (
    initialData: PageTypeWithDataNoChildren,
) {
    const [data, setDataInternal] = useState<PageTypeWithDataNoChildren>(
        initialData,
    );

    const setData = (
        key: string,
        val: string | number | boolean | Array<never>,
    ) => {
        const newData = { ...data };

        // @ts-expect-error TS7053
        newData[key] = val;

        setDataInternal(newData);
    };

    const setSlug = (val: string) => {
        const slugSlashIndex = val.indexOf('/');

        if (slugSlashIndex > -1) {
            val = val.replace('/', '');
        }

        const path = data.path.split('/');

        const newData = { ...data };

        newData.slug = val;

        path[path.length - 1] = val;

        newData.path = path.join('/');

        setDataInternal(newData);
    };

    return {
        data,
        setData,
        setSlug,
    };
}
