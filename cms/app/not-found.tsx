import React from 'react';
import { Metadata } from 'next';
import FullPageError from './FullPageError';
import { createPageTitle } from './createPageTitle';

export const metadata: Metadata = {
    title: createPageTitle('asdfPage Not Found'),
};

export default function NotFound () {
    return (
        <FullPageError
            statusCode={404}
            heading="Page Not Found"
            errorMessage="We weren’t able to find that page 🫠"
        />
    );
}
