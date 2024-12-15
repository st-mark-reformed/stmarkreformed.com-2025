'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import FullPageLoading from '../../../FullPageLoading';

export default function FrontEnd () {
    useEffect(() => {
        const url = new URL(window.location.href);

        signIn('fusion-auth', {
            callbackUrl: url.searchParams.get('authReturn')?.toString(),
        });
    });

    return <FullPageLoading />;
}
