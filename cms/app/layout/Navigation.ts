'use client';

import * as React from 'react';
import { DocumentDuplicateIcon, UsersIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

type NavigationSubItem = {
    name: string;
    href: string;
    current: boolean;
};

type NavigationSubItems = Array<NavigationSubItem>;

type NavigationItem = {
    name: string;
    href?: string;
    // eslint-disable-next-line max-len
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>>;
    current: boolean;
    children?: NavigationSubItems;
};

function createItem (
    {
        name,
        href,
        icon,
        currentPathname,
        children,
    }: {
        name: string;
        href?: string;
        // eslint-disable-next-line max-len
        icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>>;
        currentPathname: string;
        children?: NavigationSubItems;
    },
): NavigationItem {
    const trimmedPath = currentPathname.split('/').filter(Boolean).join('/');

    const firstTwoSegments = trimmedPath.split('/').slice(0, 2).join('/');

    return {
        name,
        href,
        icon,
        current: `/${firstTwoSegments}` === href,
        children,
    };
}

export default function Navigation (): Promise<Array<NavigationItem>> {
    const currentPathname = usePathname();

    return [
        createItem({
            name: 'Pages',
            href: '/pages',
            icon: DocumentDuplicateIcon,
            currentPathname,
        }),
    ];
}
