import React, { Dispatch, SetStateAction } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';

export default function ErrorMessage (
    {
        isVisible,
        setIsVisible,
        heading,
        body,
    }: {
        isVisible: boolean;
        setIsVisible: Dispatch<SetStateAction<boolean>>;
        heading?: string;
        body?: Array<string>;
    },
) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    {(() => {
                        if (!heading) {
                            return null;
                        }

                        return (
                            <h3 className="text-sm font-medium text-red-800">
                                {heading}
                            </h3>
                        );
                    })()}
                    {(() => {
                        if (!body) {
                            return null;
                        }

                        return (
                            <>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc space-y-1 pl-5">
                                        {body.map((bodyItem) => <li key={bodyItem}>{bodyItem}</li>)}
                                    </ul>
                                </div>
                            </>
                        );
                    })()}
                    {(() => {
                        if (!setIsVisible) {
                            return null;
                        }

                        return (
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                        onClick={() => {
                                            setIsVisible(false);
                                        }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
