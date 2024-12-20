import React from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { UrlFieldType } from './UrlFieldType';

export default function UrlItemWrapper (
    {
        url,
        urls,
        setUrls,
        children,
    }: {
        url: UrlFieldType;
        urls: Array<UrlFieldType>;
        setUrls: (val: Array<UrlFieldType>) => void;
        children: React.ReactNode;
    },
) {
    const removeUrl = () => {
        const urlIndex = urls.findIndex((u) => u.id === url.id);

        if (urlIndex < 0) {
            return;
        }

        const newUrls = [...urls];

        newUrls.splice(urlIndex, 1);

        setUrls(newUrls);
    };

    return (
        <div className="w-full relative z-10">
            <div
                className="absolute right-0 -mt-4"
                style={{
                    top: '50%',
                }}
            >
                <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 focus:outline-none border border-gray-200"
                    onClick={removeUrl}
                >
                    <span className="sr-only">Remove URL</span>
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="pl-4 pr-16 py-1">
                {children}
            </div>
        </div>
    );
}
