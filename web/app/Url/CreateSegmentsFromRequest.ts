import { Segments } from './Segments';

export function CreateSegmentsFromRequest (request: Request): Segments {
    return new Segments(request.headers.get('middleware-pathname') || '');
}
