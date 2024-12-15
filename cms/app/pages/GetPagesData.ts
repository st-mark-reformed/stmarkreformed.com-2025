import { RequestFactory } from '../api/request/RequestFactory';

type Response = {
    userHasAccess: boolean;
};

export default async function GetPagesData (): Promise<Response> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/all-pages',
        cacheSeconds: 0,
    });

    if (response.status === 401 || response.status === 403) {
        return { userHasAccess: false };
    }

    return { userHasAccess: true };
}
