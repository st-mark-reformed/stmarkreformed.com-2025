'use client';

import * as React from 'react';
import {
    BookOpenIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon,
    MicrophoneIcon,
    PencilSquareIcon,
    PhotoIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { PageTypeFrontEndNoDataArray } from '../pages/PageType';

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

    const firstSegment = trimmedPath.split('/').slice(0, 1).join('/');

    return {
        name,
        href,
        icon,
        current: `/${firstSegment}` === href,
        children,
    };
}

function createSubItem (
    {
        name,
        href,
        currentPathname,
    }: {
        name: string;
        href: string;
        currentPathname: string;
    },
): NavigationSubItem {
    const trimmedPath = currentPathname.split('/').filter(Boolean).join('/');

    const firstThreeSegments = trimmedPath.split('/').slice(0, 3).join('/');

    return {
        name,
        href,
        current: `/${firstThreeSegments}` === href,
    };
}

export default function Navigation (
    {
        blogEntryPages,
        podcastEntryPages,
        photoGalleryEntryPages,
        publicationsEntryPages,
    }: {
        blogEntryPages: PageTypeFrontEndNoDataArray;
        podcastEntryPages: PageTypeFrontEndNoDataArray;
        photoGalleryEntryPages: PageTypeFrontEndNoDataArray;
        publicationsEntryPages: PageTypeFrontEndNoDataArray;
    },
): Array<NavigationItem> {
    const currentPathname = usePathname();

    const menuItems = [
        createItem({
            name: 'Pages',
            href: '/pages',
            icon: DocumentDuplicateIcon,
            currentPathname,
        }),
        createItem({
            name: 'Globals',
            href: '/globals',
            icon: GlobeAltIcon,
            currentPathname,
        }),
        createItem({
            name: 'Profiles',
            href: '/profiles',
            icon: UsersIcon,
            currentPathname,
        }),
    ];

    if (blogEntryPages.length > 0) {
        menuItems.push(createItem({
            name: 'Blog Entries',
            icon: PencilSquareIcon,
            currentPathname,
            children: blogEntryPages.map((page) => (createSubItem({
                name: page.name,
                href: `/blog-entries/${page.id}`,
                currentPathname,
            }))),
        }));
    }

    if (podcastEntryPages.length > 0) {
        menuItems.push(createItem({
            name: 'Podcast Entries',
            icon: MicrophoneIcon,
            currentPathname,
            children: podcastEntryPages.map((page) => (createSubItem({
                name: page.name,
                href: `/podcast-entries/${page.id}`,
                currentPathname,
            }))),
        }));
    }

    if (photoGalleryEntryPages.length > 0) {
        menuItems.push(createItem({
            name: 'Photo Galleries',
            icon: PhotoIcon,
            currentPathname,
            children: photoGalleryEntryPages.map((page) => (createSubItem({
                name: page.name,
                href: `/galleries/${page.id}`,
                currentPathname,
            }))),
        }));
    }

    if (publicationsEntryPages.length > 0) {
        menuItems.push(createItem({
            name: 'Publications',
            icon: BookOpenIcon,
            currentPathname,
            children: publicationsEntryPages.map((page) => (createSubItem({
                name: page.name,
                href: `/publications/${page.id}`,
                currentPathname,
            }))),
        }));
    }

    return menuItems;
}
