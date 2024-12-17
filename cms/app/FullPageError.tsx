import React from 'react';
import Link from 'next/link';

export default function FullPageError (
    {
        statusCode = 500,
        heading = 'An Error Occurred',
        errorMessage = 'It looks like something went wrong 😞',
    }: {
        statusCode?: number;
        heading?: string;
        errorMessage?: string;
    },
) {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-cyan-600">{statusCode}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-950 sm:text-5xl">
                        {heading}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {errorMessage}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
