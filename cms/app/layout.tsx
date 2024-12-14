import './layout/base.css';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CMS | St. Mark Reformed Church',
    icons: {
        icon: '/images/favicon.ico',
        shortcut: '/images/favicon.ico',
    },
};

/**
 * Reading env/secrets config requires loading dynamically at runtime rather
 * than build time. This ensures that all server components render dynamically
 * because this is our root layout.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */
export const dynamic = 'force-dynamic';

export default async function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full">
                {children}
            </body>
        </html>
    );
}
