import React from 'react';
import Link from 'next/link';
import { MenuItems } from '../types/MenuType';
import { MenuSecondary } from './MenuSecondary';

export default function Footer (
    {
        menu,
    }: {
        menu: MenuItems;
    },
) {
    return (
        <footer className="bg-bronze">
            <div className="mx-auto max-w-md py-12 px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    {menu.concat(MenuSecondary).map((menuItem) => (
                        <div
                            key={menuItem.link}
                            className="px-5 py-2"
                        >
                            <Link
                                href={menuItem.link}
                                className="text-base font-bold text-gray-100 hover:text-goldenrod"
                            >
                                {menuItem.name}
                            </Link>
                        </div>
                    ))}
                </nav>
                <p className="mt-4 text-center text-base text-gray-100 font-light">
                    St. Mark Reformed Church is a member of the
                    {' '}
                    <a className="text-gray-100 hover:text-goldenrod" href="https://crechurches.org/">Communion of Reformed Evangelical Churches</a>
                    .
                </p>
                <p className="mt-4 text-center text-base text-gray-100 font-light">
                    &copy;
                    {' '}
                    {new Date().getFullYear()}
                    {' '}
                    St. Mark Reformed Church. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
