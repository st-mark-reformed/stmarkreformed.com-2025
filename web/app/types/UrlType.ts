export enum UrlType {
    // Page = 'Page',
    // Entry = 'Entry',
    Custom = 'Custom',
}

export type Url = {
    id: string;
    type: UrlType;
    linkText: string;
    linkData: string;
    newWindow: boolean;
};
