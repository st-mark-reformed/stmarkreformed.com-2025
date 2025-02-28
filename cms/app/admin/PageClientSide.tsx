'use client';

import React, { useState } from 'react';
import Message from '../messaging/Message';
import ListItem from './ListItem';
import RegenerateSiteData from './RegenerateSiteData/RegenerateSiteData';

export default function PageClientSide () {
    const [errors, setErrors] = useState<Array<string>>([]);

    return (
        <>
            <div className="space-y-8 mb-4">
                <Message
                    type="error"
                    isVisible={errors.length > 0}
                    setIsVisible={(isVisible) => {
                        if (isVisible) {
                            return;
                        }

                        setErrors([]);
                    }}
                    heading="Something went wrong"
                    body={errors}
                />
            </div>
            <ul
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"
            >
                <ListItem
                    leftContent="Site Data Generation"
                    rightContent={<RegenerateSiteData setErrors={setErrors} />}
                />
            </ul>
        </>
    );
}
