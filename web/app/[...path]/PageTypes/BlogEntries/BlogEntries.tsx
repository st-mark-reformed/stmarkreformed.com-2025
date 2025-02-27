import React from 'react';
import { notFound } from 'next/navigation';
import { PageBaseType } from '../../../types/PageType';
import EntryListing from './EntryListing';
import Pagination from '../../../Pagination/Pagination';

export default function BlogEntries (
    {
        pageData,
    }: {
        pageData: PageBaseType;
    },
) {
    if (!pageData.blogEntriesData) {
        notFound();
    }

    // console.log(pageData.blogEntriesData);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <Pagination
                    baseUrl={`/${pageData.path}`}
                    currentPage={pageData.blogEntriesData.pageNumber}
                    totalPages={pageData.blogEntriesData.totalPages}
                    className="pb-10"
                />
                <div
                    className="mx-auto grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {pageData.blogEntriesData.entries.map((entry) => (
                        <EntryListing
                            key={entry.id}
                            entry={entry}
                        />
                    ))}
                </div>
                <Pagination
                    baseUrl={`/${pageData.path}`}
                    currentPage={pageData.blogEntriesData.pageNumber}
                    totalPages={pageData.blogEntriesData.totalPages}
                    className="pt-10"
                />
            </div>
        </div>
    );
}
