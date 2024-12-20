// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { v4 as randomUUID } from 'uuid';
import { PageBuilderBaseTypeArray, PageBuilderType } from './PageBuilderTypes/PageBuilderBaseType';
import { PascalToTitle } from '../../../../../CaseConverters';
import { basicBlockDefaultData } from './PageBuilderTypes/BasicBlockType';
import { contactFormDefaultData } from './PageBuilderTypes/ContactFormType';
import { stripePaymentFormDefaultData } from './PageBuilderTypes/StripePaymentFormType';
import { simpleCtaDefaultData } from './PageBuilderTypes/SimpleCtaType';
import { imageContentCtaDefaultData } from './PageBuilderTypes/ImageContentCtaType';
import { upcomingEventsDefaultData } from './PageBuilderTypes/UpcomingEventsType';
import { latestGalleriesDefaultData } from './PageBuilderTypes/LatestGalleriesType';
import { latestNewsDefaultData } from './PageBuilderTypes/LatestNewsType';
import { featuredSermonSeriesDefaultData } from './PageBuilderTypes/FeaturedSermonSeriesType';
import { leadershipDefaultData } from './PageBuilderTypes/LeadershipType';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

type Options = Record<string, Array<{
    type: PageBuilderType;
    name: string;
    groupName: string;
}>>;

export function createOptionFromPageBuilderType (type: PageBuilderType) {
    const typeParts = type.split('_');
    const groupName = typeParts[0];
    const typeName = PascalToTitle(typeParts[1]);

    return {
        type,
        name: typeName,
        groupName,
    };
}

export default function BlockChooser (
    {
        blocks,
        setBlocks,
    }: {
        blocks: PageBuilderBaseTypeArray;
        setBlocks: (val: PageBuilderBaseTypeArray) => void;
    },
) {
    const options: Options = {};

    const types = Object.values(PageBuilderType);

    types.forEach((type) => {
        const option = createOptionFromPageBuilderType(type);

        if (!options[option.groupName]) {
            options[option.groupName] = [];
        }

        options[option.groupName].push(option);
    });

    const groups = Object.keys(options);

    const totalGroups = groups.length;

    const addNewBlock = (
        type: PageBuilderType,
        typeName: string,
    ) => {
        const newBlocks = [...blocks];

        let defaultData = {};

        if (type === PageBuilderType.Content_BasicBlock) {
            defaultData = basicBlockDefaultData;
        } else if (type === PageBuilderType.Content_ContactForm) {
            defaultData = contactFormDefaultData;
        } else if (type === PageBuilderType.Content_StripePaymentForm) {
            defaultData = stripePaymentFormDefaultData;
        } else if (type === PageBuilderType.CTAs_SimpleCta) {
            defaultData = simpleCtaDefaultData;
        } else if (type === PageBuilderType.CTAs_ImageContentCta) {
            const data = { ...imageContentCtaDefaultData };
            data.cta.id = randomUUID();
            defaultData = data;
        } else if (type === PageBuilderType.Features_UpcomingEvents) {
            defaultData = upcomingEventsDefaultData;
        } else if (type === PageBuilderType.Features_LatestGalleries) {
            defaultData = latestGalleriesDefaultData;
        } else if (type === PageBuilderType.Features_LatestNews) {
            defaultData = latestNewsDefaultData;
        } else if (type === PageBuilderType['Pre-defined_FeaturedSermonSeries']) {
            defaultData = featuredSermonSeriesDefaultData;
        } else if (type === PageBuilderType['Pre-defined_Leadership']) {
            defaultData = leadershipDefaultData;
        }

        newBlocks.push({
            ...defaultData,
            id: randomUUID(),
            type,
            typeName,
            internalName: '',
        });

        setBlocks(newBlocks);
    };

    return (
        <div className="min-h-60">
            {Object.keys(options).map((groupName, i) => {
                let roundedClass = '';

                if (i === 0) {
                    roundedClass += 'rounded-l-md ';
                }

                if ((i + 1) === totalGroups) {
                    roundedClass += 'rounded-r-md ';
                }

                let borderClass = 'border-l-0';

                if (i === 0) {
                    borderClass = '';
                }

                const groupOptions = options[groupName];

                return (
                    <Menu
                        key={groupName}
                        as="div"
                        className="relative inline-block text-left"
                    >
                        <div>
                            <Menu.Button className={`${roundedClass} inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 border border-gray-300 ${borderClass}`}>
                                {groupName}
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {groupOptions.map((option) => (
                                        <Menu.Item key={option.type}>
                                            {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'cursor-pointer block px-4 py-2 text-sm w-full text-left',
                                                    )}
                                                    onClick={() => {
                                                        addNewBlock(
                                                            option.type,
                                                            option.name,
                                                        );
                                                    }}
                                                >
                                                    {option.name}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                );
            })}
        </div>
    );
}
