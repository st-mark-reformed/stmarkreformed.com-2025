export type GlobalBaseType = {
    id: string;
    name: string;
    slug: string;
};

export type GlobalHeroDefaults = GlobalBaseType & {
    json: {
        heroDarkeningOverlayOpacity: number;
        heroImage: string;
        heroImage1x: string;
        heroImage2x: string;
    };
};

export type GlobalContactForm = GlobalBaseType & {
    json: Array<{
        id: string;
        value: string;
    }>;
};

export type AllGlobals = {
    heroDefaults: GlobalHeroDefaults;
    contactForm: GlobalContactForm;
};
