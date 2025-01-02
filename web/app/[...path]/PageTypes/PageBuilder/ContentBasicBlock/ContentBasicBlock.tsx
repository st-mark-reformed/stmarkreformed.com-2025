// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import Link from 'next/link';
import smartypants from 'smartypants';
import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { ContentBasicBlockType } from './ContentBasicBlockType';
import typography from '../../../../typography/typography';

export default function ContentBasicBlock (
    {
        blockBase,
    }: {
        blockBase: PageBuilderBlockBase;
    },
) {
    const block = blockBase as ContentBasicBlockType;

    const overLight = block.backgroundColor === '#ffffff';

    let textAlignmentClass;

    if (block.alignment === 'Left') {
        textAlignmentClass = 'text-left';
    } else if (block.alignment === 'Right') {
        textAlignmentClass = 'text-right';
    } else if (block.alignment === 'Center') {
        textAlignmentClass = 'text-center';
    }

    return (
        <div
            className="relative"
            style={{
                backgroundColor: block.backgroundColor,
            }}
        >
            <div className={(() => {
                const classes = [
                    'relative',
                    'mx-auto',
                    'px-4',
                    'py-12',
                    'sm:max-w-5xl',
                    'sm:px-14',
                    'sm:py-20',
                    'md:py-28',
                    'lg:py-32',
                    textAlignmentClass,
                ];

                if (block.noTopSpace) {
                    classes.push(...[
                        'pt-0',
                        'sm:pt-0',
                        'md:pt-0',
                        'lg:pt-0',
                        'mt-0',
                    ]);
                }

                return classes.join(' ');
            })()}
            >
                {(() => {
                    if (!block.preHeadline && block.headline) {
                        return null;
                    }

                    return (
                        <div className="mb-8">
                            {(() => {
                                if (!block.preHeadline) {
                                    return null;
                                }

                                const classes = [
                                    'text-base',
                                    'font-semibold',
                                    'uppercase',
                                    'tracking-wider',
                                ];

                                if (overLight) {
                                    classes.push('text-gray-600');
                                } else {
                                    classes.push('text-gray-100');
                                }

                                return (
                                    <h3
                                        className={classes.join(' ')}
                                        dangerouslySetInnerHTML={{
                                            __html: typography(block.preHeadline),
                                        }}
                                    />
                                );
                            })()}
                            {(() => {
                                if (!block.headline) {
                                    return null;
                                }

                                const classes = [
                                    'mt-2',
                                    'text-3xl',
                                    'font-extrabold',
                                    'tracking-tight',
                                    'sm:text-4xl',
                                ];

                                if (overLight) {
                                    classes.push('text-black');
                                } else {
                                    classes.push('text-white');
                                }

                                return (
                                    <h2
                                        className={classes.join(' ')}
                                        dangerouslySetInnerHTML={{
                                            __html: typography(block.headline),
                                        }}
                                    />
                                );
                            })()}
                        </div>
                    );
                })()}
                {(() => {
                    if (!block.content) {
                        return null;
                    }

                    const classes = [
                        'mt-3',
                        'text-lg',
                        'prose',
                        'max-w-none',
                    ];

                    if (overLight) {
                        classes.push('text-gray-600');
                    } else {
                        classes.push(...[
                            'text-gray-100',
                            'prose-over-dark',
                        ]);
                    }

                    return (
                        <div
                            className={classes.join(' ')}
                            dangerouslySetInnerHTML={{
                                __html: typography(block.content),
                            }}
                        />
                    );
                })()}
                {(() => {
                    if (block.ctas.length < 1) {
                        return null;
                    }

                    return (
                        <div className={`mt-8 ${textAlignmentClass}`}>
                            {block.ctas.map((cta, index) => {
                                const isLast = index === block.ctas.length - 1;

                                const wrapperClasses = [
                                    'inline-flex',
                                    'rounded-md',
                                    'shadow',
                                ];

                                if (!isLast) {
                                    wrapperClasses.push('mb-2');
                                }

                                const linkClasses = [
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
                                    linkClasses.push(...[
                                        'text-gray-100',
                                        'bg-crimson',
                                        'hover:bg-crimson-dark',
                                    ]);
                                } else {
                                    linkClasses.push(...[
                                        'text-gray-900',
                                        'bg-white',
                                        'hover:bg-gray-50',
                                    ]);
                                }

                                return (
                                    <div key={cta.linkData}>
                                        <div className={wrapperClasses.join(' ')}>
                                            <Link
                                                href={cta.linkData}
                                                className={linkClasses.join(' ')}
                                            >
                                                {smartypants(cta.linkText)}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
