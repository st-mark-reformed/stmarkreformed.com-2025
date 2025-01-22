import { ProfileType, ProfileTypeFrontEnd } from './ProfileType';

export function TransformProfileType (
    profile: ProfileType,
): ProfileTypeFrontEnd {
    return {
        ...profile,
        cmsHref: `/profiles/edit/${profile.id}`,
    };
}
