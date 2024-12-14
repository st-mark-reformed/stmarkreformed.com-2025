import React from 'react';
import { Metadata } from 'next';
import FrontEnd from './FrontEnd';

export const metadata: Metadata = {
    title: 'Sign In | St. Mark Reformed Church',
};

export default function Page () {
    return (
        <FrontEnd />
    );
}
