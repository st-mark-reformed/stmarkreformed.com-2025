import React from 'react';

export default function AccessDenied (
    {
        code = 401,
    }: {
        code?: string | number;
    },
) {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-cyan-600">{code}</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-red-800 sm:text-7xl">
                        Access Denied
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        You cannot access this area.
                    </p>
                    <p className="mt-1 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Please contact the administrator if you believe this is an error.
                    </p>
                </div>
            </main>
        </>
    );
}
