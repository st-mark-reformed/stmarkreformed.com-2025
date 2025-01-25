import { ProfileType, ProfileTypeFrontEnd } from '../../ProfileType';
import { RequestFactory } from '../../../api/request/RequestFactory';
import { TransformProfileType } from '../../ProfileTransformer';

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
    data: ProfileTypeFrontEnd;
};

export async function GetProfileData (
    profileId: string,
): Promise<ResponseNoAccess | ResponseWith404 | ResponseWithAccess> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: `/profiles/${profileId}`,
        cacheSeconds: 5,
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

    const profile = response.json as ProfileType;

    return {
        userHasAccess: true,
        notFound: false,
        data: TransformProfileType(profile),
    };
}
