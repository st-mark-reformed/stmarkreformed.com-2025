import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ResponseWithAllData } from './GetPageData/ResponseTypes';
import { PageType } from '../types/PageType';

function removeLeadingSlash (link: string) {
    if (link.charAt(0) === '/') {
        link = link.substring(1);
    }

    return link;
}

export default async function PageTypeWrapper (
    {
        data,
        segment1,
        path,
        children,
    }: {
        data: ResponseWithAllData;
        segment1: string;
        path: string;
        children: ReactNode;
    },
) {
    if (
        data.pageData.type !== PageType.page
        && data.pageData.type !== PageType.page_builder
    ) {
        return children;
    }

    if (!data.pageData.showSubPageSidebar) {
        return children;
    }

    const parentMenuIndex = data.menu.findIndex(
        (menuItem) => removeLeadingSlash(menuItem.link).split('/')[0] === segment1,
    );

    if (parentMenuIndex < 0) {
        return children;
    }

    const parentMenu = data.menu[parentMenuIndex];

    if (parentMenu.children.length < 1) {
        return children;
    }

    const menu = [
        {
            name: parentMenu.name,
            link: parentMenu.link,
        },
        ...parentMenu.children.map((item) => ({
            name: item.name,
            link: item.link,
        })),
    ];

    return (
        <div className="min-h-screen-minus-header-and-footer">
            <div className="min-h-screen-minus-header-and-footer overflow-hidden md:flex">
                <div className="md:flex md:flex-shrink-0 bg-crimson">
                    <div className="mx-auto w-64 flex flex-col">
                        <div className="pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
                            <div className="flex-grow flex flex-col">
                                <nav className="flex-1 px-2 space-y-1">
                                    {menu.map((menuItem, index) => {
                                        const dynamicClasses = [];

                                        if (index === 0) {
                                            dynamicClasses.push('font-bold');
                                        } else {
                                            dynamicClasses.push('font-normal');
                                        }

                                        if (removeLeadingSlash(menuItem.link) === path) {
                                            dynamicClasses.push('bg-bronze');
                                        } else {
                                            dynamicClasses.push('hover:bg-bronze');
                                        }

                                        return (
                                            <Link
                                                href={menuItem.link}
                                                className={`${dynamicClasses.join(' ')} hover:bg-bronze text-white group rounded-md py-2 px-2 flex items-center text-base`}
                                            >
                                                {menuItem.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}
