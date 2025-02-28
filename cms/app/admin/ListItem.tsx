import React from 'react';

export default function ListItem (
    {
        leftContent,
        rightContent,
    }: {
        leftContent: React.ReactNode | string;
        rightContent: React.ReactNode | string;
    },
) {
    if (typeof leftContent === 'string') {
        leftContent = (
            <p className="text-sm font-semibold leading-6 text-gray-900">
                {leftContent}
            </p>
        );
    }

    if (typeof rightContent === 'string') {
        rightContent = (
            <div className="text-sm leading-6 text-gray-900">
                {rightContent}
            </div>
        );
    }

    return (
        <li className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    {leftContent}
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                    {rightContent}
                </div>
            </div>
        </li>
    );
}
