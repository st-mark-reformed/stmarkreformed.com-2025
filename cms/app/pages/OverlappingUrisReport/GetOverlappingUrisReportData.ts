import { RequestFactory } from '../../api/request/RequestFactory';
import { OverlappingUris, OverlappingUrisSchema } from './OverlappingUris';

export async function GetOverlappingUrisReportData (): Promise<OverlappingUris> {
    const response = await RequestFactory().makeWithSignInRedirect({
        uri: '/pages/overlapping-uris-report',
        cacheSeconds: 0,
        cacheTags: ['pageData'],
    });

    if (response.status === 401 || response.status === 403) {
        return [];
    }

    OverlappingUrisSchema.parse(response.json);

    return response.json as OverlappingUris;
}
