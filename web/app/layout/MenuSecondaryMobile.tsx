import Link from 'next/link';
import React from 'react';
import { MenuSecondary } from './MenuSecondary';

export default function MenuSecondaryMobile () {
    return (
        <>
            <div className="mt-6 px-5">
                <p className="text-center text-base font-medium text-gray-500">
                    {MenuSecondary.map((menuItem) => (
                        <Link
                            key={menuItem.link}
                            href={menuItem.link}
                            className="text-gray-900 hover:underline"
                        >
                            {menuItem.name}
                        </Link>
                    ))}
                </p>
            </div>
        </>
    );
}
