'use client';

import { SignInPage } from 'rxante-oauth';
import React from 'react';

export default function FrontEnd () {
    return (
        <SignInPage
            providerId="fusion-auth"
            reactLoadingColor="#392c08"
        />
    );
}
