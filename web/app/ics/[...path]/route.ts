import { CreateSegmentsFromRequest } from '../../Url/CreateSegmentsFromRequest';
import getRedisClient from '../../cache/RedisClient';

export async function GET (request: Request) {
    const headers = { 'Content-Type': 'text/plain' };

    const segments = CreateSegmentsFromRequest(request);

    const { trimmedPath } = segments.fromSegmentsAfter(1);

    const redis = getRedisClient();

    const icsData = await redis.get(`static_ics_data:${trimmedPath}`);

    if (!icsData) {
        return new Response('Resource not found', {
            status: 404,
            headers,
        });
    }

    return new Response(icsData, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
