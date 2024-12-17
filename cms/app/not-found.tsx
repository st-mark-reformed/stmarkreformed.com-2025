import React from 'react';
import { Metadata } from 'next';
import FullPageError from './FullPageError';
import { createPageTitle } from './createPageTitle';

export const metadata: Metadata = {
    title: createPageTitle('Page Not Found'),
};

export default function Error () {
    return (
        <FullPageError
            statusCode={404}
            heading="Page Not Found"
            errorMessage="We weren’t able to find that page 🫠"
        />
    );
}
