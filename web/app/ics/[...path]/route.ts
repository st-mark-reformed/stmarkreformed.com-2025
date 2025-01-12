import { CreateSegmentsFromRequest } from '../../Url/CreateSegmentsFromRequest';
import getRedisClient from '../../cache/RedisClient';

export async function GET (request: Request) {
    const segments = CreateSegmentsFromRequest(request);

    const { trimmedPath } = segments.fromSegmentsAfter(1);

    const redis = getRedisClient();

    const icsData = await redis.get(`static_ics_data:${trimmedPath}`);

    if (!icsData) {
        return new Response('Resource not found', {
            status: 404,
            headers: { 'content-type': 'text/plain' },
        });
    }

    return new Response(icsData, {
        headers: {
            'cache-control': 'must-revalidate, post-check=0, pre-check=0',
            'content-type': 'text/calendar; charset=utf-8',
            expires: '0',
            pragma: 'public',
        },
    });
}
