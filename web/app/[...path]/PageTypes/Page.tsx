// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import { PageBaseType } from '../../types/PageType';
import typography from '../../typography/typography';

export default function Page (
    {
        pageData,
    }: {
        pageData: PageBaseType;
    },
) {
    return (
        <div className="relative bg-white">
            <div className="relative mx-auto px-4 py-12 sm:max-w-5xl sm:px-14 sm:py-20 md:py-28 lg:py-32 text-left">
                <div
                    className="mt-3 text-lg text-gray-600 prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: typography(pageData.data),
                    }}
                />
            </div>
        </div>
    );
}
