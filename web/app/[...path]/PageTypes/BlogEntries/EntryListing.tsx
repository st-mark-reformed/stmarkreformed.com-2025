// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import { BlogEntryBaseType } from '../../../types/BlogEntryBaseType';
import typography from '../../../typography/typography';
import { formatDate } from '../../../types/DateFormats';

export default function EntryListing (
    {
        entry,
    }: {
        entry: BlogEntryBaseType;
    },
) {
    return (
        <article
            className="flex flex-col items-start justify-between border border-gray-200 p-3 sm:p-6 shadow-md rounded-lg"
        >
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="todo: date" className="text-gray-500">
                    {formatDate(entry.datePublishedFormats, 'M j, Y, g:i a')}
                </time>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a
                        href={entry.href}
                        dangerouslySetInnerHTML={{
                            __html: typography(entry.name),
                        }}
                    />
                </h3>
                <p
                    className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
                    dangerouslySetInnerHTML={{
                        __html: typography(entry.contentExcerpt),
                    }}
                />
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                {(() => {
                    if (!entry.author) {
                        return null;
                    }

                    return (
                        <div className="text-sm/6">
                            <p className="font-semibold text-gray-900">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: typography(entry.author.fullNameWithTitle),
                                    }}
                                />
                            </p>
                            {(() => {
                                if (!entry.author?.leadershipPosition.value) {
                                    return <p className="text-gray-600" />;
                                }

                                return (
                                    <p
                                        className="text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: typography(
                                                entry.author.leadershipPosition.humanReadable,
                                            ),
                                        }}
                                    />
                                );
                            })()}
                        </div>
                    );
                })()}
            </div>
            <a
                href={entry.href}
                className="mt-3 w-full rounded-md bg-crimson px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-crimson-dark text-center"
            >
                Read Entry
            </a>
        </article>
    );
}
