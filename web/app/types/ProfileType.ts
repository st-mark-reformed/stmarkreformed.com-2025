export type ProfileType = {
    id: string;
    photo: string;
    titleOrHonorific: string;
    firstName: string;
    lastName: string;
    firstAndLastName: string;
    fullNameWithTitle: string;
    email: string;
    leadershipPosition: {
        value: string;
        humanReadable: string;
    };
    bio: string;
    hasMessages: boolean;
};
