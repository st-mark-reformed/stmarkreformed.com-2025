import React from 'react';
import Sidebar from './Sidebar';
import Breadcrumbs, { BreadcrumbItems, CurrentBreadcrumbItem } from './Breadcrumbs';

export default async function Layout (
    {
        children,
        breadcrumbs,
    }: {
        children: React.ReactNode;
        breadcrumbs?: {
            breadcrumbs: BreadcrumbItems;
            currentBreadcrumb: CurrentBreadcrumbItem;
        };
    },
) {
    return (
        <div>
            <Sidebar />
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
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
