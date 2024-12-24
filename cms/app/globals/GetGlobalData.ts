import { v4 as randomUUID } from 'uuid';
import { GlobalsSchema, GlobalsType, GlobalType } from './GlobalType';
import { RequestFactory } from '../api/request/RequestFactory';

type ResponseNoAccess = {
    userHasAccess: false;
};

type ResponseWithAccess = {
    userHasAccess: true;
    data: {
        heroDefaults: GlobalType;
        contactForm: GlobalType;
    };
};

export async function GetGlobalData (): Promise<
ResponseNoAccess | ResponseWithAccess
> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/globals/all',
        cacheSeconds: 5,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return { userHasAccess: false };
    }

    const data = response.json as GlobalsType;

    GlobalsSchema.parse(data);

    const heroDefaults: GlobalType = data.filter(
        (global) => global.slug === 'heroDefaults',
    )[0] || {
        id: '',
        name: 'Hero Defaults',
        slug: 'heroDefaults',
        json: [],
    };

    const contactForm: GlobalType = data.filter(
        (global) => global.slug === 'contactForm',
    )[0] || {
        id: '',
        name: 'Contact Form',
        slug: 'contactForm',
        json: [],
    };

    return {
        userHasAccess: true,
        data: {
            heroDefaults,
            contactForm,
        },
    };
}
