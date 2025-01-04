// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import smartypants from 'smartypants';
import typography from '../../../../typography/typography';
import { ImageContentCtaType } from './ImageContentCtaType';
import { PageBuilderBlockBase } from '../../../../types/PageBuilder';

export default function ImageContentCta (
    {
        blockBase,
    }: {
        blockBase: PageBuilderBlockBase;
    },
) {
    const block = blockBase as ImageContentCtaType;

    return (
        <div
            className="relative"
            style={{
                backgroundColor: block.backgroundColor,
            }}
        >
            <div
                className="relative h-56 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2"
                style={(() => {
                    if (block.contentDisposition !== 'Content Left / Image Right') {
                        return {};
                    }

                    return { marginLeft: '50%' };
                })()}
            >
                <img
                    className="w-full h-full object-cover"
                    src={block.image1x}
                    srcSet={`${block.image1x} 1x, ${block.image2x} 2x`}
                    alt=""
                    loading="lazy"
                />
                {(() => {
                    if (!block.showTealOverlayOnImages) {
                        return null;
                    }

                    return (
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply"
                        />
                    );
                })()}
                {(() => {
                    if (!block.cta.linkText || !block.cta.linkData) {
                        return null;
                    }

                    return (
                        <Link
                            className="block absolute inset-0 z-50"
                            href={block.cta.linkData}
                            target={block.cta.newWindow ? '_blank' : '_self'}
                        >
                            <span className="sr-only">{smartypants(block.cta.linkText)}</span>
                        </Link>
                    );
                })()}
            </div>
            <div
                className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32"
            >
                <div
                    className={(() => {
                        if (block.contentDisposition === 'Content Left / Image Right') {
                            return 'md:mr-auto md:pr-10 md:w-1/2';
                        }

                        return 'md:ml-auto md:pl-10 md:w-1/2';
                    })()}
                >
                    {(() => {
                        if (!block.preHeadline) {
                            return null;
                        }

                        return (
                            <h3
                                className="text-base font-semibold uppercase tracking-wider text-gray-100"
                                dangerouslySetInnerHTML={{ __html: typography(block.preHeadline) }}
                            />
                        );
                    })()}
                    {(() => {
                        if (!block.headline) {
                            return null;
                        }

                        return (
                            <h2
                                className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl"
                                dangerouslySetInnerHTML={{ __html: typography(block.headline) }}
                            />
                        );
                    })()}
                    {(() => {
                        if (!block.content) {
                            return null;
                        }

                        return (
                            <div
                                className="mt-3 text-lg text-gray-100 prose prose-over-dark"
                                dangerouslySetInnerHTML={{ __html: typography(block.content) }}
                            />
                        );
                    })()}
                    {(() => {
                        if (!block.cta.linkText || !block.cta.linkData) {
                            return null;
                        }

                        return (
                            <div className="mt-8">
                                <div className="inline-flex rounded-md shadow">
                                    <Link
                                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100"
                                        href={block.cta.linkData}
                                        target={block.cta.newWindow ? '_blank' : '_self'}
                                    >
                                        {smartypants(block.cta.linkText)}
                                        {block.cta.newWindow && (
                                            <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 text-gray-900" />
                                        )}
                                    </Link>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
