import React from 'react';
import { redirect } from 'next/navigation';
import { PageBaseType } from '../../../types/PageType';

export default function Calendar (
    {
        pageData,
    }: {
        pageData: PageBaseType;
    },
) {
    /**
     * If there is no monthDays, then this is the base page and we need to
     * redirect to the current month
     */
    if (!pageData.monthDays || !pageData.monthRows) {
        const date = new Date();

        redirect([
            '',
            pageData.path,
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
        ].join('/'));
    }

    const { monthDays } = pageData;

    const monthString = 'TODO monthString';
    const dateHeading = 'TODO dateHeading';
    const icsUrl = 'TODO/icsUrl';
    const currentMonthLink = 'TODO/currentMonthLink';
    const prevMonthLink = 'TODO/prevMonthLink';
    const nextMonthLink = 'TODO/nextMonthLink';

    return (
        <div className="p-4 pb-10 max-w-1800px mx-auto">
            <div className="lg:flex lg:h-full lg:flex-col">
                <header className="relative z-20 sm:flex items-center justify-between border-b border-gray-200 py-4 lg:flex-none">
                    <h1 className="mb-4 sm:mb-0 text-lg font-semibold text-gray-900">
                        <time dateTime={monthString}>{dateHeading}</time>
                    </h1>
                    <div className="flex items-center">
                        <div className="mr-4 items-center flex">
                            <div className="relative">
                                <a
                                    href={icsUrl}
                                    type="button"
                                    className="flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 select-none"
                                    id="menu-button"
                                    title="Copy and paste link into the subscribe action of your calendar"
                                >
                                    Subscribe
                                </a>
                            </div>
                        </div>
                        {(() => {
                            if (currentMonthLink === null) {
                                return null;
                            }

                            return (
                                <div className="mr-4 items-center flex">
                                    <div className="relative">
                                        <a
                                            href={currentMonthLink}
                                            type="button"
                                            className="flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                            id="menu-button"
                                        >
                                            Current Month
                                        </a>
                                    </div>
                                </div>
                            );
                        })()}
                        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                            <a
                                href={prevMonthLink}
                                type="button"
                                className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous month</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={nextMonthLink}
                                type="button"
                                className="flex items-center justify-center rounded-r-md border border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                            >
                                <span className="sr-only">Next month</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </header>
                <div className="hidden shadow-md lg:flex lg:flex-auto lg:flex-col">
                    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-400 text-center text-xs font-semibold leading-6 text-gray-100 lg:flex-none">
                        <div className="bg-crimson-dark py-2">
                            S
                            <span className="sr-only sm:not-sr-only">un</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            M
                            <span className="sr-only sm:not-sr-only">on</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            T
                            <span className="sr-only sm:not-sr-only">ue</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            W
                            <span className="sr-only sm:not-sr-only">ed</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            T
                            <span className="sr-only sm:not-sr-only">hu</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            F
                            <span className="sr-only sm:not-sr-only">ri</span>
                        </div>
                        <div className="bg-crimson-dark py-2">
                            S
                            <span className="sr-only sm:not-sr-only">at</span>
                        </div>
                    </div>
                    <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                        <div className={`hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-${monthDays.rows} lg:gap-px`}>
                            {monthDays.map((day) => (
                                <div
                                    key={day.ymd}
                                    className={(() => {
                                        if (day.isActiveMonth) {
                                            if (day.isInPast) {
                                                return 'relative bg-gray-100 py-2 px-3';
                                            }

                                            return 'relative bg-gray-50 py-2 px-3';
                                        }

                                        return 'relative bg-gray-200 text-gray-400 py-2 px-3';
                                    })()}
                                >
                                    <time
                                        className={`inline-block relative${day.isCurrentDay ? ' ml-2' : ''}`}
                                        dateTime={day.ymd}
                                    >
                                        <span className="relative z-20">
                                            {day.day}
                                            {(() => {
                                                if (day.isInPast) {
                                                    return <span className="text-gray-400 text-xxs italic"> (past)</span>;
                                                }

                                                return null;
                                            })()}
                                        </span>
                                        {(() => {
                                            if (!day.isCurrentDay) {
                                                return null;
                                            }

                                            return (
                                                <span
                                                    className="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lightest-red h-7 w-7 z-10 rounded-full"
                                                />
                                            );
                                        })()}
                                    </time>
                                    {(() => {
                                        if (day.events.length < 1) {
                                            return null;
                                        }

                                        return (
                                            <ol className="mt-2">
                                                {day.events.map((event) => (
                                                    <li
                                                        key={event.uid}
                                                        className={(() => {
                                                            console.log('TODO');
                                                            // if (event.allDay) {
                                                            //     if (day.isActiveMonth) {
                                                            //         return 'mb-4 bg-crimson py-0.5 px-1.5';
                                                            //     }
                                                            //
                                                            //     return 'mb-4 bg-lighter-red py-0.5 px-1.5';
                                                            // }

                                                            return 'mb-4 py-0.5 px-1.5';
                                                        }
                                                        )()}
                                                    >
                                                        <span className="group leading-tight">
                                                            <p
                                                                className={(() => {
                                                                    if (day.isActiveMonth) {
                                                                        // if (event.allDay) {
                                                                        //     return 'font-medium text-white leading-tight';
                                                                        // }

                                                                        return 'font-medium text-gray-900 leading-tight';
                                                                    }

                                                                    // if (event.allDay) {
                                                                    //     return 'font-medium text-gray-300 leading-tight';
                                                                    // }

                                                                    return 'font-medium text-gray-400 leading-tight';
                                                                })()}
                                                            >
                                                                {!event.isAllDay && (
                                                                    <time
                                                                        className={(() => {
                                                                            if (day.isActiveMonth) {
                                                                                return 'text-teal-600 inline-block font-bold';
                                                                            }

                                                                            return 'text-gray-400 inline-block font-bold';
                                                                        })()}
                                                                    >
                                                                        TODO
                                                                        {/* {event.startDate.format('g:i A')} */}
                                                                        :
                                                                    </time>
                                                                )}
                                                                {event.summary}
                                                            </p>
                                                            {event.location
                                                                    && <p className="font-light text-xs">{event.location}</p>}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ol>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {(() => {
                    return <>Bar</>;
                    if (monthEventsOnly.count === 0) {
                        return null;
                    }

                    return (
                        <div className="py-10 sm:px-6 lg:hidden">
                            <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                                {monthEventsOnly.items.map((event, index) => (
                                    <li key={index} className={`group flex p-4 pr-6${event.isInPast ? ' bg-gray-100' : ''}`}>
                                        <div className="flex-auto">
                                            <p className={`font-semibold${event.isInPast ? ' text-gray-400' : ' text-teal-600'}`}>
                                                {event.event.title}
                                                {event.isInPast && <span className="text-gray-400 text-xxs italic font-normal">(past)</span>}
                                            </p>
                                            <p className={`${event.isInPast ? 'text-gray-400' : 'text-gray-900'}`}>
                                                {event.event.location}
                                            </p>
                                            <time dateTime="2022-01-15T09:00" className={`mt-2 flex items-center${event.isInPast ? ' text-gray-400' : 'text-gray-700'}`}>
                                                <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                {event.event.startDate.format('l, F j, g:i A')}
                                            </time>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
