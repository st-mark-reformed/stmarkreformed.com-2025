import { RequestFactory } from '../api/request/RequestFactory';
import { ProfileType, ProfileTypeFrontEnd } from './ProfileType';
import { TransformProfileType } from './ProfileTransformer';

type ResponseNoAccess = {
    userHasAccess: false;
};

type ResponseWithAccess = {
    userHasAccess: true;
    data: Array<ProfileTypeFrontEnd>;
};

export default async function GetProfilesData (): Promise<
ResponseNoAccess | ResponseWithAccess
> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/profiles/all-profiles',
        cacheSeconds: 0,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return { userHasAccess: false };
    }

    const profiles = response.json as Array<ProfileType>;

    return {
        userHasAccess: true,
        data: profiles.map((profile) => TransformProfileType(profile)),
    };
}
