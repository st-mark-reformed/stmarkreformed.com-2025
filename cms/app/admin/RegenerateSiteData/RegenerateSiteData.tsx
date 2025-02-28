import React, { Dispatch, SetStateAction, useState } from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import Loader from '../../Loader';
import PostRegenerateSiteData from './PostRegenerateSiteData';

export default function RegenerateSiteData (
    {
        setErrors,
    }: {
        setErrors: Dispatch<SetStateAction<Array<string>>>;
    },
) {
    const [isRegenerating, setIsRegenerating] = useState(false);

    const buttonClasses = [
        'rounded',
        'px-2',
        'py-1',
        'text-xs',
        'font-semibold',
        'shadow-sm',
        'ml-2',
    ];

    if (isRegenerating) {
        buttonClasses.push(
            'bg-gray-200',
            'text-gray-400',
        );
    } else {
        buttonClasses.push(
            'bg-cyan-600',
            'text-white',
            'hover:bg-cyan-700',
            'focus-visible:outline',
            'focus-visible:outline-2',
            'focus-visible:outline-offset-2',
            'focus-visible:outline-cyan-600',
        );
    }

    return (
        <div>
            {(() => {
                if (!isRegenerating) {
                    return null;
                }

                return <Loader />;
            })()}
            <button
                type="button"
                className={buttonClasses.join(' ')}
                onClick={() => {
                    setIsRegenerating(true);

                    PostRegenerateSiteData().then((result) => {
                        setIsRegenerating(false);

                        if (!result.userHasAccess) {
                            setErrors(
                                ['It looks like you may not be logged in.'],
                            );

                            return;
                        }

                        if (result.data.success) {
                            return;
                        }

                        setErrors(result.data.messages);
                    });
                }}
            >
                <ArrowPathRoundedSquareIcon className="h-3 w-3 inline -mt-0.5" />
                {' '}
                Regenerate
            </button>
        </div>
    );
}
