// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import smartypants from 'smartypants';
import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { SimpleCtaBlockType } from './SimpleCtaBlockType';
import typography from '../../../../typography/typography';

export default function SimpleCta (
    {
        blockBase,
    }: {
        blockBase: PageBuilderBlockBase;
    },
) {
    const block = blockBase as SimpleCtaBlockType;

    const overLight = block.backgroundColor === '#ffffff';

    return (
        <div
            className="relative"
            style={{
                backgroundColor: block.backgroundColor,
            }}
        >
            <div className="relative mx-auto px-4 py-12 sm:max-w-4xl sm:px-14 sm:py-20 md:py-28 lg:py-32 text-center">
                {(() => {
                    if (!block.preHeadline) {
                        return null;
                    }

                    return (
                        <h3
                            className={`text-base font-semibold uppercase tracking-wider ${overLight ? 'text-gray-600' : 'text-gray-100'}`}
                            dangerouslySetInnerHTML={{ __html: typography(block.preHeadline) }}
                        />
                    );
                })()}
                {(() => {
                    if (block.headline) {
                        return (
                            <h2
                                className={`mt-2 ${overLight ? 'text-black' : 'text-white'} text-3xl font-extrabold tracking-tight sm:text-4xl`}
                                dangerouslySetInnerHTML={{ __html: typography(block.headline) }}
                            />
                        );
                    }

                    return null;
                })()}
                {(() => {
                    if (!block.content) {
                        return null;
                    }

                    return (
                        <div
                            className={`mt-3 text-lg ${overLight ? 'text-gray-600' : 'text-gray-100'}`}
                            dangerouslySetInnerHTML={{ __html: typography(block.content) }}
                        />
                    );
                })()}
                {(() => {
                    if (block.ctas.length < 1) {
                        return null;
                    }

                    return (
                        <div className="mt-8 text-center">
                            {block.ctas.map((cta) => (
                                <div
                                    key={`${cta.linkData}-${cta.linkText}`}
                                    className="inline-flex rounded-md shadow m-1"
                                >
                                    <Link
                                        href={cta.linkData}
                                        className={(() => {
                                            const classes = [
                                                'inline-flex',
                                                'items-center',
                                                'justify-center',
                                                'px-5',
                                                'py-3',
                                                'border',
                                                'border-transparent',
                                                'text-base',
                                                'font-medium',
                                                'rounded-md',
                                            ];

                                            if (overLight) {
                                                classes.push(...[
                                                    'text-gray-100',
                                                    'bg-crimson',
                                                    'hover:bg-crimson-dark',
                                                ]);
                                            } else {
                                                classes.push(...[
                                                    'text-gray-900',
                                                    'bg-white',
                                                    'hover:bg-gray-100',
                                                ]);
                                            }

                                            return classes.join(' ');
                                        })()}
                                        target={cta.newWindow ? '_blank' : '_self'}
                                        rel="noreferrer"
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: smartypants(cta.linkText) }} />
                                        {(() => {
                                            if (!cta.newWindow) {
                                                return null;
                                            }

                                            return (
                                                <ArrowTopRightOnSquareIcon
                                                    className={(() => {
                                                        const classes = [
                                                            '-mr-1',
                                                            'ml-3',
                                                            'h-5',
                                                            'w-5',
                                                        ];

                                                        if (overLight) {
                                                            classes.push('text-gray-200');
                                                        } else {
                                                            classes.push('text-gray-900');
                                                        }

                                                        return classes.join(' ');
                                                    })()}
                                                />
                                            );
                                        })()}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
