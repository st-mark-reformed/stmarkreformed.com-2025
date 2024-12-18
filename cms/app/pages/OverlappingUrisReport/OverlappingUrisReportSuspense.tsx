import React, { Suspense } from 'react';
import { OverlappingUrisReport } from './OverlappingUrisReport';

export function OverlappingUrisReportSuspense () {
    return (
        <Suspense>
            <OverlappingUrisReport />
        </Suspense>
    );
}
