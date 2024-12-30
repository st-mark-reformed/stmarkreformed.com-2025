import Link from 'next/link';
import React from 'react';
import { MenuSecondary } from './MenuSecondary';

export default function MenuSecondaryDesktop () {
    return (
        <>
            {MenuSecondary.map((menuItem) => (
                <Link
                    key={menuItem.link}
                    href={menuItem.link}
                    className="text-base font-normal text-white hover:text-goldenrod"
                >
                    {menuItem.name}
                </Link>
            ))}
        </>
    );
}
