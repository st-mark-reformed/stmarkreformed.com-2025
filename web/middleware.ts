import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextMiddlewareHeadersFactory } from 'rxante-oauth/dist/NextMiddlewareHeadersFactory';

export async function middleware (req: NextRequest) {
    return NextResponse.next({
        // @ts-expect-error TS2345
        request: { headers: NextMiddlewareHeadersFactory(req) },
    });
}
