import React, { Suspense } from 'react';
import Sidebar from './Sidebar';
import Breadcrumbs, { BreadcrumbItems, CurrentBreadcrumbItem } from './Breadcrumbs';
import PartialPageLoading from '../PartialPageLoading';
import GetBlogEntryPages from './GetBlogEntryPages';
import GetPodcastEntryPages from './GetPodcastEntryPages';
import GetPhotoGalleryEntryPages from './GetPhotoGalleryEntryPages';
import GetPublicationsEntryPages from './GetPublicationsEntryPages';

export enum InnerMaxWidth {
    xsmall = 'max-w-3xl',
    small = 'max-w-4xl',
    medium = 'max-w-5xl',
    large = 'max-w-6xl',
    xlarge = 'max-w-7-xl',
}

export default async function Layout (
    {
        children,
        breadcrumbs,
        innerMaxWidth = InnerMaxWidth.medium,
    }: {
        children: React.ReactNode;
        breadcrumbs?: {
            breadcrumbs: BreadcrumbItems;
            currentBreadcrumb: CurrentBreadcrumbItem;
        };
        innerMaxWidth?: InnerMaxWidth;
    },
) {
    const blogEntryPages = await GetBlogEntryPages();
    const podcastEntryPages = await GetPodcastEntryPages();
    const photoGalleryEntryPages = await GetPhotoGalleryEntryPages();
    const publicationsEntryPages = await GetPublicationsEntryPages();

    return (
        <div>
            <Sidebar
                blogEntryPages={blogEntryPages}
                podcastEntryPages={podcastEntryPages}
                photoGalleryEntryPages={photoGalleryEntryPages}
                publicationsEntryPages={publicationsEntryPages}
            />
            <div className="lg:pl-72">
                {(() => {
                    if (!breadcrumbs) {
                        return null;
                    }

                    return (
                        <Breadcrumbs
                            breadcrumbs={breadcrumbs.breadcrumbs}
                            currentBreadcrumb={breadcrumbs.currentBreadcrumb}
                        />
                    );
                })()}
                <main className="">
                    <div className="p-4 sm:p-6 md:p-8">
                        <Suspense fallback={<PartialPageLoading />}>
                            <div className={innerMaxWidth}>
                                {children}
                            </div>
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
}
