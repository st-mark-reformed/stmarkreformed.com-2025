import React from 'react';
import Link from 'next/link';
import { MenuItems } from '../types/MenuType';

export default function MenuMainMobile (
    {
        menu,
    }: {
        menu: MenuItems;
    },
) {
    return (
        <div className="px-2 space-y-1">
            {menu.map((menuItem) => (
                <>
                    <Link
                        key={menuItem.link}
                        href={menuItem.link}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-bronze hover:text-gray-200"
                    >
                        {menuItem.name}
                    </Link>
                    {menuItem.children.map((subMenuItem) => (
                        <Link
                            key={subMenuItem.link}
                            href={subMenuItem.link}
                            className="block pl-12 pr-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-bronze hover:text-gray-200"
                        >
                            {subMenuItem.name}
                        </Link>
                    ))}
                </>
            ))}
        </div>
    );
}
