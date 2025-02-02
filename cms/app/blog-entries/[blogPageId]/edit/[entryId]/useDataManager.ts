import { useState } from 'react';
import { EntryTypeFrontEnd, Type } from '../../../EntryType';
import { PageStatus } from '../../../../pages/PageType';

type SubmissionData = Omit<EntryTypeFrontEnd, 'blogPage' | 'author'> & {
    authorId: string | null;
};

export default function useDataManager (initialData: EntryTypeFrontEnd) {
    const stateData = {
        ...initialData,
        authorId: initialData.author?.id || null,
    };

    // @ts-expect-error TS2790
    delete stateData.blogPage;

    // @ts-expect-error TS2790
    delete stateData.author;

    const [data, setDataInternal] = useState<SubmissionData>(stateData);

    const setStringData = (
        key: 'id' | 'authorId' | 'name' | 'path' | 'data',
        val: string,
    ) => {
        const newData = { ...data };

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

    const setStatus = (status: PageStatus) => {
        const newData = { ...data };

        newData.status = status;

        setDataInternal(newData);
    };

    const setType = (type: Type) => {
        const newData = { ...data };

        newData.type = type;

        setDataInternal(newData);
    };

    const setJson = (json: Array<never>) => {
        const newData = { ...data };

        newData.json = json;

        setDataInternal(newData);
    };

    const setDatePublished = (datePublished: Date | null) => {
        const newData = { ...data };

        newData.datePublished = datePublished;

        setDataInternal(newData);
    };

    return {
        data,
        setStringData,
        setSlug,
        setStatus,
        setType,
        setJson,
        setDatePublished,
    };
}
