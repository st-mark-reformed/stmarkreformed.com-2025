import { EntryType, EntryTypeFrontEnd, TransformEntry } from '../../../EntryType';
import { RequestFactory } from '../../../../api/request/RequestFactory';

type ResponseNoAccess = {
    userHasAccess: false;
    notFound: false;
};

type ResponseWith404 = {
    userHasAccess: true;
    notFound: true;
};

type ResponseWithAccess = {
    userHasAccess: true;
    notFound: false;
    entry: EntryTypeFrontEnd;
};

export async function GetEntryData (
    blogPageId: string,
    entryId: string,
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: `/blog-entries/${blogPageId}/edit/${entryId}`,
        cacheSeconds: 0,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return {
            userHasAccess: false,
            notFound: false,
        };
    }

    if (response.status === 404) {
        return {
            userHasAccess: true,
            notFound: true,
        };
    }

    const entry = response.json as EntryType;

    return {
        userHasAccess: true,
        notFound: false,
        entry: TransformEntry(entry),
    };
}
