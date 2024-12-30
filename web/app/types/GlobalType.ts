export type GlobalBaseType = {
    id: string;
    name: string;
    slug: string;
};

export type GlobalHeroDefaults = GlobalBaseType & {
    json: {
        heroDarkeningOverlayOpacity: number;
        heroImage: string;
    };
};

export type GlobalContactForm = GlobalBaseType & {
    json: Array<{
        id: string;
        value: string;
    }>;
};
