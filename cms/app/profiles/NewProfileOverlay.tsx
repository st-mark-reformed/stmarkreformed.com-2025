import React, { useState } from 'react';
import PortalOverlay from '../layout/PortalOverlay';
import Message from '../messaging/Message';
import PostNewProfileHandler, { ProfileData } from './PostNewProfileHandler';

export default function NewProfileOverlay (
    {
        closeOverlay,
    }: {
        closeOverlay: () => void;
    },
) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: '',
        lastName: '',
    });

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    let headingTopPadding = '';

    if (errorIsVisible) {
        headingTopPadding = 'mt-2';
    }

    const submitHandler = () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        PostNewProfileHandler(profileData).then((result) => {
            setIsSubmitting(false);

            if (result.data.success) {
                setErrors([]);

                closeOverlay();

                return;
            }

            setErrors(result.data.messages);

            setErrorIsVisible(true);
        });
    };

    const buttonClasses = [
        'rounded-md',
        'px-3.5',
        'py-2.5',
        'text-sm',
        'font-semibold',
        'text-white',
        'shadow-sm',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
    ];

    if (isSubmitting) {
        buttonClasses.push('bg-gray-300');
    } else {
        buttonClasses.push(
            'bg-cyan-600',
            'hover:bg-cyan-700',
            'focus-visible:outline-cyan-600',
        );
    }

    const inputClasses = [
        'block',
        'w-full',
        'rounded-md',
        'border-0',
        'py-1.5',
        'text-gray-900',
        'shadow-sm',
        'ring-1',
        'ring-inset',
        'ring-gray-300',
        'placeholder:text-gray-400',
        'focus:ring-inset',
        'focus:ring-gray-400',
        'sm:text-sm',
        'sm:leading-6',
    ];

    return (
        <PortalOverlay>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className="bg-white shadow sm:rounded-lg text-left"
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        closeOverlay();
                    }

                    if (e.key !== 'Enter') {
                        return;
                    }

                    submitHandler();
                }}
            >
                <div className="px-4 py-5 sm:p-6 min-w-96">
                    <Message
                        isVisible={errorIsVisible}
                        setIsVisible={setErrorIsVisible}
                        heading="Something went wrong"
                        body={errors}
                        type="error"
                    />
                    <h3
                        className={`${headingTopPadding} text-base font-semibold leading-6 text-gray-900`}
                    >
                        New Profile
                    </h3>
                    <div className="mt-2 text-left">
                        <div className="w-full mb-2">
                            <label
                                htmlFor="firstName"
                                className="text-gray-500 text-sm"
                            >
                                First Name
                            </label>
                            <input
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={profileData.firstName}
                                onChange={(e) => {
                                    setProfileData({
                                        ...profileData,
                                        firstName: e.currentTarget.value,
                                    });
                                }}
                                className={inputClasses.join(' ')}
                                autoComplete="off"
                            />
                        </div>
                        <div className="w-full mb-2">
                            <label
                                htmlFor="lastName"
                                className="text-gray-500 text-sm"
                            >
                                Last Name
                            </label>
                            <input
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={profileData.lastName}
                                onChange={(e) => {
                                    setProfileData({
                                        ...profileData,
                                        lastName: e.currentTarget.value,
                                    });
                                }}
                                className={inputClasses.join(' ')}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={() => {
                                    closeOverlay();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={buttonClasses.join(' ')}
                                onClick={submitHandler}
                                disabled={isSubmitting}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalOverlay>
    );
}
