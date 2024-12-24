import { GlobalType } from '../../GlobalType';
import { GetGlobalData } from '../../GetGlobalData';

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
    data: GlobalType;
};

export async function GetData (
    slug: 'heroDefaults' | 'contactForm',
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const response = await GetGlobalData();

    if (!response.userHasAccess) {
        return {
            userHasAccess: false,
            notFound: false,
        };
    }

    const data = response.data[slug] || null;

    if (data === null) {
        return {
            userHasAccess: true,
            notFound: true,
        };
    }

    return {
        userHasAccess: true,
        notFound: false,
        data,
    };
}
